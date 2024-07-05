from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import items
from .services import websocket as websocket_service


app = FastAPI(title="API", description="API description", version="1.0.0")

origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(items.router)


@app.get("/")
def read_root():
    websocket_service.publish_event(
        "test", "test-event", {"message": "Hello from Pusher!"}
    )
    return {"Hello": "World"}
