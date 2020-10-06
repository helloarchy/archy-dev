#
# Dockerfile for Server
#

# pull official base image
FROM node:12-alpine

# set working directory
WORKDIR /usr/src/app/

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/server/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./


RUN npm install

# add app
COPY . .

EXPOSE 4000

# start app
CMD ["nodemon", "server.js"]