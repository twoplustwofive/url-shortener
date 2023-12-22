# Use the official Node.js image from Docker Hub (choose an appropriate version)
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that your NestJS application is running on
EXPOSE 3000

# Start the NestJS application
CMD ["npm", "start"]
