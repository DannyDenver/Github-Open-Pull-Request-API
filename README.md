# Github-Open-Pull-Request-API

## To run the application:

  1. Run `npm install`
  2. Add .env file with `TOKEN={your github api token}`, axios requests to Github might fail because Github has api request limits. Adding an authorization token increases the api request limit.
  2. Run `npm start`
  3. The app will be running on http://localhost:5000 ie http://localhost:5000/api/v1/repos/jashkenas/underscore/pulls

## To make a GET request to the application:

http://localhost:5000/api/v1/repos/{owner}/{repository}/pulls
    owner -> owner of the repository
    repository -> repository you would like to see open pull requests for

For example: http://localhost:5000/api/v1/repos/jashkenas/underscore/pulls

## To make requests to the api in AWS, go to https://nt0tg49o3b.execute-api.us-east-1.amazonaws.com/dev/api/v1/repos/{owner}/{repository}/pulls

## To run the tests, run command  `npm test` at the root level

### Main Files: Project Structure

  ```sh
  ├── /github-api-serverless  *** Github Open Pull Requests API in Serverless Framework
  │         ├── /.serverless ** Cloudformation scripts
  │         ├── /node_modules
  │         ├── github-api.ts ** where bulk of lambda code is
  │         ├── models.ts
  │         ├── package.json
  │         ├── README.md
  │         ├── serverless.yml ** IAC for AWS serverless
  │         └── tsconfi.json
  ├── /src
  │      ├── app.ts ** api endpoints
  │      ├── models.ts
  │      └── server.ts ** server startup
  ├── /tests
  │      └── app.spec.ts
  │
  ├── .env
  ├── .gitignore
  ├── jest.config.js
  ├── package.json
  ├── README.md
  └── tsconfig.json
