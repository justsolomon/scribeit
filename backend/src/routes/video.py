import uuid
import json
from fastapi import APIRouter, File, Header, Depends, UploadFile, Request, HTTPException
from ..config.settings import settings
from ..utils.file import get_video_file_path
from pathlib import Path

router = APIRouter()


def check_upload_allowed(req: Request):
    if len(req.app.video_queue) == settings.MAX_QUEUE_LENGTH:
        raise HTTPException(
            status_code=429,
            detail="Video upload limit reached. Please try again later.",
        )


async def valid_content_length(
    content_length: int = Header(..., lt=settings.FILE_SIZE_LIMIT),
):
    return content_length


@router.get("/video/upload-allowed")
def video_upload_allowed(req: Request):
    check_upload_allowed(req)

    return {"message": "Upload allowed"}


@router.post("/video/upload", dependencies=[Depends(valid_content_length)])
def upload_video(req: Request, video: UploadFile = File(...)):
    check_upload_allowed(req)

    user_id = str(uuid.uuid4())

    try:
        contents = video.file.read()
        output_file = Path(get_video_file_path(user_id, video.filename, "mp4"))
        output_file.parent.mkdir(exist_ok=True, parents=True)

        with open(output_file, "wb") as f:
            f.write(contents)
    except Exception:
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
    req.app.video_queue.append(video_info)

    print(f"INFO: Added video to queue - {video_info}")
    req.app.pusher_client.trigger(
        channels=user_id,
        event_name="transcribe-status",
        data={
            "message": "Waiting to convert video...",
            "type": "info",
        },
    )

    return {
        "userId": f"{user_id}",
        "message": f"Successfully uploaded {video.filename}",
    }


@router.get("/video/transcription")
def get_video_transcription(req: Request, userId: str):
    result = req.app.cache.get(userId)

    if not result:
        raise HTTPException(status_code=404, detail="Transcription not found")

    return json.loads(result)
