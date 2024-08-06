import json
from fastapi import APIRouter, Depends, UploadFile, Request, HTTPException
from ..services import video as video_service

router = APIRouter()


@router.get("/video/upload-allowed")
def video_upload_allowed(req: Request):
    video_service.check_upload_allowed(req)

    return {"message": "Upload allowed"}


@router.post(
    "/video/upload", dependencies=[Depends(video_service.validate_content_length)]
)
async def upload_video(req: Request, video: UploadFile):
    video_service.check_upload_allowed(req)

    user_id = await video_service.add_video_to_queue(
        video, req.app.video_queue, req.app.pusher_client
    )

    return {
        "userId": f"{user_id}",
        "message": f"Successfully uploaded {video.filename}",
    }


@router.get("/video/transcription")
def get_video_transcription(req: Request, userId: str):
    result = req.app.cache.get(userId)

    if not result:
        print(f"ERROR: Transcription not found for {userId}")
        raise HTTPException(status_code=404, detail="Transcription not found")

    return json.loads(result)
