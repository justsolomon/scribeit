from fastapi import APIRouter, File, Header, Depends, UploadFile, Request, HTTPException
from ..config.settings import settings
from ..utils.file import get_video_file_path
from pathlib import Path
import uuid

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
def upload_status(req: Request):
    check_upload_allowed(req)

    return {"message": "Upload allowed"}


@router.post("/video/upload", dependencies=[Depends(valid_content_length)])
def upload_video(req: Request, video: UploadFile = File(...)):
    check_upload_allowed(req)

    user_id = uuid.uuid4()

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

    req.app.video_queue.append(
        {"user_id": user_id, "filename": video.filename, "file_ext": "mp4"}
    )

    return {
        "userId": f"{user_id}",
        "message": f"Successfully uploaded {video.filename}",
    }
