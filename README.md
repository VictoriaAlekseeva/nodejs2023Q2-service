# 📀 Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

Clone current repo

```
git clone https://github.com/VictoriaAlekseeva/nodejs2024Q1-service.git
```

## Checking the second assignment

Assignment link https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md

Switch to the task branch part-2

```
git checkout part-2
```

## Installing NPM modules

```
npm install
```


## Running application

<!-- Create a .env file in the project's root folder and set the port number there. The app will run on the specified port in the .env file or on port 4000 if the port is not specified. -->

Rename .env.example to .env

<!-- Then run command:

```
npm start
``` -->

<!-- You'll see the port in console

After starting the app on port (4000 as default or from your .env file) you can open
in your browser OpenAPI documentation by typing http://localhost:{PORT}/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/. -->

run
npm run docker-compose up

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

<!-- ### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging -->
