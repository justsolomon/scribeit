import os
import asyncio
from pathlib import Path
from collections import deque
from ..config.settings import settings
from ..utils import file as file_utils


async def remove_unused_files(video_queue: deque, audio_queue: deque) -> None:
    print("INFO: Waiting for unused files...")

    while True:
        for subdir, _, files in os.walk("files"):
            for filename in files:
                file_path = os.path.join(subdir, filename)

                if (
                    file_utils.is_video(file_path)
                    and not file_utils.is_file_in_queue(filename, video_queue)
                ) or (
                    file_utils.is_audio(file_path)
                    and not file_utils.is_file_in_queue(filename, audio_queue)
                ):
                    file_obj = Path(file_path)
                    file_obj.unlink(missing_ok=True)
                    print(f"INFO: Deleted unused file - {file_path}")

        await asyncio.sleep(settings.ASYNCIO_DELAY)
