# React App Template

## Getting Started

The following contains the steps required to get the application up and running on your local workspace.

### Prerequisites

- Node v18.17.0
- yarn v1.22.19
- Git v2.39.2

### Running locally

To run the app locally, follow the steps below:

1. Clone the repository to your PC using your terminal. For more info, refer to this [article.](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository-from-github/cloning-a-repository)

2. After cloning, navigate into the repo using the command:

   ```
   cd template
   ```

3. Install the dependencies in the package.json using the command:

   ```
   yarn install
   ```

4. After the dependencies have been installed successfully, create a .env file at the root. Take a look at the env.sample file and configure your environment variables with your values in the .env file.

5. After adding the environment variables, run the app in your terminal using the command:
   ```
   yarn start
   ```

## Writing Tests

**NOTE:** All test files should have a `.test.ts` or `.test.tsx` file extension.

All tests for a component or utility function should be placed in a `__tests__` folder relative to the folder it resides in.

For example, if you had a `Header.tsx` file located in `src/components/Header`, and your tests are in a `header.test.tsx` file, do the following:

1. Create a `__tests__` folder in the `src/components/Header` folder

2. Move the `header.test.tsx` file to the `__tests__` folder

The file structure would look similar to this:

```
.
├── src
│   └── components
|       └── Header
│           ├── Header.tsx
│           └── __tests__
│               └── header.test.tsx

```

## Running Tests

To run tests, run the following command:

```
yarn test
```

## Git Hooks

- **pre-commit**: Automatically formats the codebase using Prettier every time a git commit is made.

- **pre-push**: Runs the unit tests when pushing to the remote repository.
