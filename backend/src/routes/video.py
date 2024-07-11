from fastapi import APIRouter, File, Header, Depends, UploadFile, Request, HTTPException

router = APIRouter()


async def valid_content_length(content_length: int = Header(..., lt=4_000_000)):
    return content_length


@router.post("/video/upload", dependencies=[Depends(valid_content_length)])
def upload_video(req: Request, video: UploadFile = File(...)):
    raise HTTPException(status_code=404, detail="Item not found")
    try:
        contents = video.file.read()
        with open("videos/" + video.filename, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        video.file.close()

    return {"message": f"Successfully uploaded {video.filename}"}

   
