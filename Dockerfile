# Use the official Node.js image as base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH
# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the frontend application code into the container
COPY . .

RUN npm install -g react 

RUN npm install -g react-scripts 

# Expose the port on which the React application will run
EXPOSE 3000

# Command to start the React application
CMD ["npm", "start"]