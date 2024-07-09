from collections import deque
import asyncio
from ..config.settings import settings


async def print_task(queue: deque):
    print("Waiting for tasks...")

    while True:
        if queue:
            print("Processing task in queue...")
            print(queue.popleft())

        await asyncio.sleep(settings.ASYNCIO_DELAY)
