from fastapi import FastAPI
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from .routes import video
from .config import database, pusher
import asyncio
from redis import Redis
from collections import deque
from .utils.queue import video_to_audio, transcribe_audio, remove_unused_files
from pusher import Pusher
import whisper


@asynccontextmanager
async def lifespan(app: FastAPI):
    # initialize redis as cache
    app.cache = Redis(connection_pool=database.redis_pool)

    # initialize pusher client
    app.pusher_client = Pusher(**pusher.pusher_config)

    # initialize processing queues
    app.video_queue = deque()
    app.audio_queue = deque()

    # initialize whisper model
    app.whisper_model = whisper.load_model("base.en")

    # start processing tasks
    asyncio.create_task(
        video_to_audio(app.video_queue, app.audio_queue, app.pusher_client)
    )
    asyncio.create_task(
        transcribe_audio(
            app.audio_queue, app.whisper_model, app.cache, app.pusher_client
        )
    )
    asyncio.create_task(remove_unused_files(app.video_queue, app.audio_queue))

    yield

    print("INFO: Shutting down...")


app = FastAPI(
    title="API", description="API description", version="1.0.0", lifespan=lifespan
)


origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(video.router)
