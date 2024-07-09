import redis
from .settings import settings


def create_redis_pool():
    return redis.ConnectionPool(
        host=settings.REDIS_HOST,
        port=settings.REDIS_PORT,
        username=settings.REDIS_USERNAME,
        password=settings.REDIS_PASSWORD,
    )


redis_pool = create_redis_pool()
