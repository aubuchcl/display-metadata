# Use the lightweight Alpine-based Node image
FROM node:alpine

RUN apk add --update curl jq alpine-sdk
# Set the working directory inside the container
WORKDIR /usr/app

# Copy package.json and install dependencies
# This step is optional if you don't have any dependencies
COPY package.json .
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port that your app will run on
EXPOSE 3000

# Command to run the application
CMD ["node", "index.js"]

