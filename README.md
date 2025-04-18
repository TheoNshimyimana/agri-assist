# `agr_assist`

Welcome to your new `agr_assist` project and to the Internet Computer development community. By default, creating a new project adds this README and some template files to your project directory. You can edit these template files to customize your project and to include your own code to speed up the development cycle.

To get started, you might want to explore the project directory structure and the default configuration file. Working with this project in your development environment will not affect any production deployment or identity tokens.


## Running the project locally

If you want to test your project locally, you can use the following commands:

```bash
# Starts the replica, running in the background
dfx start --clean --background

# Deploys your canisters to the replica and generates your candid interface
dfx deploy
```

Once the job completes, your application will be available at `http://localhost:4943?canisterId={asset_canister_id}`.




If you are making frontend changes, you can start a development server with

```bash
cd agr_assist/src/agr_assist_frontend
npm start
```

Which will start a server at `http://localhost:3000`, proxying API requests to the replica at port 4943.


at any time. This is recommended before starting the frontend development server, and will be run automatically any time you run `dfx deploy`.



