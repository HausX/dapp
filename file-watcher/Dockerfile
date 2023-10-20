FROM node:18-alpine AS deps

WORKDIR /usr/src/app

# Install SQLite
RUN apk add --no-cache sqlite

# Declare the build argument
ARG LIGHTHOUSE_API_KEY

# Set the environment variable using the build argument
ENV LIGHTHOUSE_API_KEY=$LIGHTHOUSE_API_KEY

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the local source code files to the container
COPY . .

# The command that will be executed when the container starts
CMD [ "npx", "ts-node", "watcher.ts" ]  