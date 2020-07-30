# pull official base image
FROM node:13.12.0-alpine

# Use nodemon for hot reloading
RUN npm install -g nodemon

# set working directory
WORKDIR /app/server

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/server/node_modules/.bin:$PATH

# install app dependencies
COPY package*.json ./
RUN npm install

#RUN npm install react-scripts@3.4.1 -g --silent

# add app
COPY . .

EXPOSE 4000

# start app
CMD ["nodemon", "server.js"]