import os
import asyncio
import subprocess
import json
import glob
from pathlib import Path
from collections import deque
from pusher.pusher_client import PusherClient
from whisper import Whisper
from redis import Redis
from ..config.settings import settings
from .file import get_video_file_path, get_audio_file_path, get_storage_filename


def is_file_in_queue(filename: str, queue: deque) -> bool:
    return any(filename == get_storage_filename(item['filename'], item['file_ext']) for item in queue)


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

async def video_to_audio(
    video_queue: deque, audio_queue: deque, pusher_client: PusherClient
) -> None:
    print("INFO: Waiting for uploaded videos...")

    while True:
        while video_queue:
            video = video_queue[0]
            user_id = video["user_id"]
            print(f"INFO: Converting video - {video}")
            pusher_client.trigger(
                channels=user_id,
                event_name="transcribe-status",
                data={"message": "Converting video...", "type": "info"},
            )

            video_file_path, audio_file_path = (
                get_video_file_path(**video),
                get_audio_file_path(user_id, video["filename"]),
            )

            try:
                video_file_path.resolve(strict=True)
            except FileNotFoundError:
                print(f"ERROR: File not found - {video_file_path}")
                pusher_client.trigger(
                    channels=user_id,
                    event_name="transcribe-status",
                    data={
                        "message": "Transcription failed. Please try again.",
                        "type": "error",
                    },
                )
                pass
            else:
                create_parent_directory(audio_file_path)

                try:
                    convert_video(video_file_path, audio_file_path)
                    
                    split_audio_files = glob.glob(f"{audio_file_path}_*.ogg")
                    print(f"INFO: Successfully split audio files with base {audio_file_path} into: {split_audio_files}")

                    pusher_client.trigger(
                        channels=user_id,
                        event_name="transcribe-status",
                        data={
                            "message": "Waiting to transcribe video...",
                            "type": "info",
                        },
                    )
                                        
                    for audio_file in split_audio_files:
                        audio_queue.append({**video, "file_path": audio_file, "file_ext": "ogg"})
                except subprocess.CalledProcessError as e:
                    print(
                        f"ERROR: An error occurred while converting {video_file_path} to {audio_file_path}"
                    )
                    pusher_client.trigger(
                        channels=user_id,
                        event_name="transcribe-status",
                        data={
                            "message": "Video conversion failed. Please try again.",
                            "type": "error",
                        },
                    )
                    print(f"Error message: {e.output.decode()}")

            video_queue.popleft()

        await asyncio.sleep(settings.ASYNCIO_DELAY)


async def transcribe_audio(
    audio_queue: deque,
    whisper_model: Whisper,
    cache: Redis,
    pusher_client: PusherClient,
) -> None:
    print("INFO: Waiting for converted audio...")

    while True:
        while audio_queue:
            audio = audio_queue[0]
            user_id = audio["user_id"]

            print(f"INFO: Transcribing audio - {audio}")
            pusher_client.trigger(
                channels=user_id,
                event_name="transcribe-status",
                data={"message": "Transcribing video...", "type": "info"},
            )

            try:
                result = whisper_model.transcribe(
                    audio["file_path"]
                )

                transcription = cache.get(user_id)
                if transcription:
                    transcription = json.loads(transcription)
                    transcription.append(result)
                else:
                    transcription = [result]
                    
                cache.set(user_id, json.dumps(transcription))
                pusher_client.trigger(
                    channels=user_id,
                    event_name="transcribe-status",
                    data={"message": "Transcription complete", "type": "success"},
                )
            except Exception as err:
                print(f"ERROR: An error occurred while transcribing {audio}")
                print(f"Error message: {err}")

                pusher_client.trigger(
                    channels=user_id,
                    event_name="transcribe-status",
                    data={
                        "message": "Transcription failed. Please try again.",
                        "type": "error",
                    },
                )
            finally:
                audio_queue.popleft()

        await asyncio.sleep(settings.ASYNCIO_DELAY)


async def remove_unused_files(video_queue: deque, audio_queue: deque) -> None:
    print("INFO: Waiting for unused files...")

    while True:
        for subdir, _, files in os.walk("files"):
            for filename in files:
                file_path = os.path.join(subdir, filename)

                if (
                    is_video(file_path) and not is_file_in_queue(filename, video_queue)
                ) or (
                    is_audio(file_path) and not is_file_in_queue(filename, audio_queue)
                ):
                    file_obj = Path(file_path)
                    file_obj.unlink(missing_ok=True)
                    print(f"INFO: Deleted unused file - {file_path}")

        await asyncio.sleep(settings.ASYNCIO_DELAY)
