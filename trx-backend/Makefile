# this will load every line in the dev.env file
dpl ?= dev.env
include $(dpl)
export $(shell sed 's/=.*//' $(dpl))

run: install run-docker migrate run-koa 

run-mounted: run-docker-mounted run-koa

run-docker:
	docker run --rm --name ${PG_NAME} -e POSTGRES_PASSWORD=${PG_PASSWORD} -d -p 5432:5432 postgres

run-docker-mounted:
	docker run --rm --name ${PG_NAME} -e POSTGRES_PASSWORD=${PG_PASSWORD} -d -p 5432:5432 --mount type=bind,source=${PWD}/postgres,target=/var/lib/postgresql/data postgres

run-koa:
	npm start

install:
	npm install

clean-install:
	rm -rf node_modules
	npm install

migrate:
	echo "Migrating"
	cd db; npx sequelize db:create 
	cd db; npx sequelize db:migrate
	cd db; npx sequelize db:seed:all

stop:
	docker kill ${PG_NAME}