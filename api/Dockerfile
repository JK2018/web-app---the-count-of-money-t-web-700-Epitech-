# pull official base image
FROM node

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

RUN rm -rf migration

# add app
COPY . ./

ADD start.sh /
RUN chmod +x /start.sh

# start app
CMD ["/start.sh"]
