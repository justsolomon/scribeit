import pusher
from dotenv import dotenv_values

config = dotenv_values(".env")

pusher_client = pusher.Pusher(
    app_id=config["PUSHER_APP_ID"],
    key=config["PUSHER_APP_KEY"],
    secret=config["PUSHER_APP_SECRET"],
    cluster=config["PUSHER_APP_CLUSTER"],
)


def publish_event(channel, event, message):
    pusher_client.trigger(channel, event, message)
