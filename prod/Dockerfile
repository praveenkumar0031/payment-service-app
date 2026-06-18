    # Step 1: Use a lightweight Node base image
    FROM node:18-alpine

    # Step 2: Set working directory inside the container
    WORKDIR /usr/src/app

    # Step 3: Copy package files and install production dependencies
    COPY package*.json ./
    RUN npm ci --only=production


    # Step 4: Copy the application source code
    COPY prod/server.js .

    # Step 5: Expose the application port
    EXPOSE 3000

    # Step 6: Define command to start the app
    CMD ["npm", "start"]