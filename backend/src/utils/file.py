import re
from pathlib import Path


def get_storage_filename(user_id: str, filename: str, file_ext: str) -> str:
    return f"{re.sub('[^A-Za-z0-9]+', '', filename)}-{user_id}.{file_ext}"


def get_video_file_path(user_id: str, filename: str, file_ext: str) -> Path:
    return Path(f"files/videos/{get_storage_filename(user_id, filename, file_ext)}")


def get_audio_file_path(user_id: str, filename: str) -> Path:
    return Path(f"files/audios/{get_storage_filename(user_id, filename, 'ogg')}")
