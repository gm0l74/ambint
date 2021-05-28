FROM node:13.12.0-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY ./package*.json ./

RUN npm install

# Expose the service port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
