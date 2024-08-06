import re
import subprocess
from pathlib import Path
from collections import deque


def get_storage_filename(filename: str, file_ext: str) -> str:
    return f"{re.sub('[^A-Za-z0-9]+', '', filename)}.{file_ext}"


def get_video_file_path(user_id: str, filename: str, file_ext: str) -> Path:
    return Path(f"files/videos/{user_id}/{get_storage_filename(filename, file_ext)}")


def get_audio_file_path(user_id: str, filename: str) -> Path:
    return Path(f"files/audios/{user_id}/{get_storage_filename(filename, 'ogg')}")


def is_file_in_queue(filename: str, queue: deque) -> bool:
    return any(
        filename == get_storage_filename(item["filename"], item["file_ext"])
        for item in queue
    )


def is_video(file_path: str) -> bool:
    return file_path.endswith(".mp4")


def is_audio(file_path: str) -> bool:
    return file_path.endswith(".ogg")


def create_parent_directory(file_path: str) -> None:
    file = Path(file_path)
    file.parent.mkdir(exist_ok=True, parents=True)


def convert_video(
    video_file_path: str,
    audio_file_path: str,
) -> None:
    convert_video_command = f"ffmpeg -i {video_file_path} -vn -map_metadata -1 -ac 1 -c:a libopus -b:a 12k -application voip {audio_file_path}"
    split_audio_command = f"ffmpeg -i {audio_file_path} -f segment -segment_time 30 -c copy {audio_file_path}_%03d.ogg"

    subprocess.check_output(convert_video_command, stderr=subprocess.STDOUT, shell=True)
    print(f"INFO: Successfully converted {video_file_path} to {audio_file_path}")

    subprocess.check_output(split_audio_command, stderr=subprocess.STDOUT, shell=True)
