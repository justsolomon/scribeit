import uuid
from fastapi import Header, Request, HTTPException, UploadFile
from ..config.settings import settings
from ..utils.file import get_video_file_path
from pathlib import Path
from collections import deque
from pusher.pusher_client import PusherClient


def check_upload_allowed(req: Request):
    if len(req.app.video_queue) == settings.MAX_QUEUE_LENGTH:
        print("ERROR: Video queue at max length")
        raise HTTPException(
            status_code=429,
            detail="Video upload limit reached. Please try again later.",
        )


async def validate_content_length(
    content_length: int = Header(..., lt=settings.FILE_SIZE_LIMIT),
):
    return content_length


async def add_video_to_queue(
    video: UploadFile, video_queue: deque, pusher_client: PusherClient
):
    user_id = str(uuid.uuid4())

    try:
        contents = video.file.read()
        output_file = Path(get_video_file_path(user_id, video.filename, "mp4"))
        output_file.parent.mkdir(exist_ok=True, parents=True)

        with open(output_file, "wb") as f:
            f.write(contents)
    except Exception as err:
        print("ERROR: Error uploading file")
        print(err)
        raise HTTPException(
            status_code=500,
            detail="There was an error uploading the file. Please try again.",
        )
    finally:
        video.file.close()

    video_info = {
        "user_id": user_id,
        "filename": video.filename,
        "file_ext": "mp4",
    }
    video_queue.append(video_info)

    print(f"INFO: Added video to queue - {video_info}")
    pusher_client.trigger(
        channels=user_id,
        event_name="transcribe-status",
        data={
            "message": "Waiting to convert video...",
            "type": "info",
        },
    )

    return user_id
