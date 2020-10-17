# Willdom backend challenge

Small nodejs webserver written with koa+sequelize which serves data from a postgresql db.

## Requirements

- node 12+
- docker

# Commands

## Unix like

For Mac and Linux theres a makefile that I like to use as a makeshift launcher for the whole thing. It provides a couple of utilities to make it easier to launch the project.

### Run

`$ make run`  
The quickest way to launch the server is to run which launches the postgres container, run the creation migration and seeding of sequelize and also runs the server.

### Stop

`$ make stop`  
Theres also a stop command to stop the postgres docker component

### Test

`$ npm run test`

## Other os

### Setup

`$ npm install`

### Linting

`$ npm run lint`

### Run

`$ docker run --rm --name pg-docker -e POSTGRES_PASSWORD=postgres -d -p 5432:5432 postgres`  
`$ cd db; npx sequelize db:create`  
`$ cd db; npx sequelize db:migrate`  
`$ cd db; npx sequelize db:seed:all`  
First we need to run the postgresql db, then we create the db, run the migrations and then we seed the user table.  
After that you can start the server.  
`$ npm start`

### Stop

`$ docker stop pg-docker`

# TODO

- Add some testing and mocking
- Add husky to lint on every commit
