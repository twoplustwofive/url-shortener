# Dockerfile for React app
FROM node:14-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the PORT environment variable
ENV PORT=3001

# Expose the specified port
EXPOSE $PORT

# Start the app
CMD ["npm", "start"]
