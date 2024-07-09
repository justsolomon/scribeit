from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PUSHER_APP_ID: str
    PUSHER_APP_KEY: str
    PUSHER_APP_SECRET: str
    PUSHER_APP_CLUSTER: str

    REDIS_HOST: str
    REDIS_PORT: str
    REDIS_USERNAME: str
    REDIS_PASSWORD: str

    ASYNCIO_DELAY: int

    model_config = SettingsConfigDict(env_file="./.env", env_file_encoding="utf-8")


settings = Settings()
