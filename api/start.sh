#!/bin/bash

while !</dev/tcp/postgres/5432; do sleep 1; done; 
./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:generate -n initDatabase
yarn typeorm:migration:run
yarn start:dev