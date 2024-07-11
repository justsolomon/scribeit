from fastapi import FastAPI, Request
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware
from .routes import video
from .config import database, pusher
import asyncio
from redis import Redis
from collections import deque
from .utils.queue import print_task
from pusher import Pusher


@asynccontextmanager
async def lifespan(app: FastAPI):
    # initialize redis as cache
    app.cache = Redis(connection_pool=database.redis_pool)

    # initialize pusher client
    app.pusher_client = Pusher(**pusher.pusher_config)

    # initialize processing queue
    app.queue = deque()
    asyncio.create_task(print_task(app.queue))

    yield

    print("Shutting down...")


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


@app.get("/")
def read_root(req: Request):
    req.app.queue.append("Hello World")
    return {"Hello": "World"}
