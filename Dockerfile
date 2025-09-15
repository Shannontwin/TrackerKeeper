# Use a Node.js base image
    FROM node:lts-alpine

    # Set the working directory in the container
    WORKDIR /app

    # Copy package.json and package-lock.json (if present)
    COPY package*.json ./

    # Install dependencies
    RUN npm install

    # Copy the rest of your application code
    COPY . .

    # Build your application (if applicable, e.g., for a React app)
    # RUN npm run build

    # Expose the port your application listens on
    EXPOSE 8080

    # Define the command to run your application
    CMD ["npm", "start"]
