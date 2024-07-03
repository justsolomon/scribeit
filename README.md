#

## Getting Started

The following contains the steps required to get the application up and running on your local workspace. You need to have the packages listed in the `Prerequisites` section installed on your PC to be able to continue.

### Prerequisites

- Node v22.2.0
- yarn v1.22.19
- Git v2.39.3
- Python 3.9.14

### Running locally

To run the app locally, follow the steps below:

1. Clone the repository to your PC using your terminal. For more info, refer to this [article.](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)

2. After cloning, navigate into the repo using the command:

   ```
   cd
   ```

3. At the root of the repo, install the dependencies in the `package.json` using the command:

   ```
   yarn install
   ```

4. After the dependencies have been installed successfully, create the virtual environment using the command:

   ```
   ./bin/create-venv
   ```

5. After creating the virtual environment, you can setup the project using the command:

   ```
   source backend/.venv/bin/activate && ./bin/setup
   ```

6. Once the command above runs, a new `.env` file will be generated at the root of both the `backend` and `frontend` folders. Configure your environment variables with your values in the `backend/.env` and `frontend/.env` files.

7. After adding the environment variables, run the app in your terminal using the command:

   ```
   source backend/.venv/bin/activate && ./bin/start
   ```

**PS:** To run the app, you can simply use the `./bin/start` command if the virtual environment is already activated.
