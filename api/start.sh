#!/bin/bash

while !</dev/tcp/postgres/5432; do sleep 1; done;
yarn schema:drop
rm -rf ./src/migration
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n initDatabase
yarn typeorm:migration:run
yarn seed:run
yarn start:dev