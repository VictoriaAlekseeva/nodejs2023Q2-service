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

Rename .env.example to .env

run
```
npm run docker-compose up
```

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

### To che vulnerabilities

run
```
npm docker:scan
```


### Docker Images could be found here:

https://hub.docker.com/?uuid=4E9FF780-8157-41B1-A1E4-7A67C73520F3