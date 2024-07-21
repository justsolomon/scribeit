# ScribeIt!

ScribeIt! is a web application that allows you to transcribe videos and download the subtitles for free. Powered by OpenAI's [Whisper](https://github.com/openai/whisper).

## How It Works

When a video is uploaded by the user, it gets sent to the server for processing. On the server, the video is first converted to audio format using `ffmpeg`, before being passed to the Whisper model to transcribe. The transcription result is then stored in a `Redis` cache, before being fetched by the client to display. For real-time updates on the status of the transcription, the server communicates with the client using [Pusher](https://pusher.com/) events.

## Demo

https://github.com/user-attachments/assets/964e352a-3cf2-443c-8943-1f7c2ef87cc4

## Getting Started

The following contains the steps required to get the application up and running on your local workspace.

### Prerequisites

The following packages must be installed on your PC:

- Node v22.2.0
- yarn v1.22.19
- Git v2.39.3
- Python v3.9.14
- ffmpeg v7.0.1

You also need secrets from the following providers to continue. To see the exact secrets you need, check the `.env.sample` files in the `backend` and `frontend` folders:

- Redis: You can run the server by [installing Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/) locally, or using [Redis Cloud](https://redis.io/docs/latest/operate/rc/).
- Pusher: Get started by creating an account on [Pusher.com](https://dashboard.pusher.com/accounts/sign_up) and creating a [Channels](https://pusher.com/channels/) app.

### Running locally

To run the app locally, follow the steps below:

1. Clone the repository to your PC using your terminal. For more info, refer to this [article.](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)

2. After cloning, navigate into the repo using the command:

   ```
   cd scribeit
   ```

3. At the root of the repo, install the dependencies in the `package.json` using the command:

   ```
   yarn install
   ```

4. After the dependencies have been installed successfully, create the virtual environment using the command:

   ```
   ./bin/create-venv
   ```

5. After creating the virtual environment, activate it using the command:

   ```
   source backend/.venv/bin/activate
   ```

6. Once you are in the virtual environment, you can setup the project using the command:

   ```
   ./bin/setup
   ```

7. Once the command above runs, a new `.env` file will be generated at the root of both the `backend` and `frontend` folders. Configure your environment variables with your values in the `backend/.env` and `frontend/.env` files.

8. After adding the environment variables, run the app in your terminal using the command:

   ```
   source backend/.venv/bin/activate && ./bin/start
   ```

**PS:** To run the app, you can simply use the `./bin/start` command if the virtual environment is already activated.
