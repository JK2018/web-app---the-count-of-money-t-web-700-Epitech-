FROM node:12-alpine

WORKDIR /app

ADD package.json /app/package.json

RUN yarn install

ADD . /app

EXPOSE 3000

# PRODUCTION
#CMD ["yarn", "build"]
#CMD ["yarn", "start:prod"]

# DEV
CMD ["yarn", "start"]