FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies first for better layer caching
COPY package.json package-lock.json ./
RUN npm install

# Copy application source code
COPY . ./

# Start the application specifying external port mapping
EXPOSE 3000
CMD ["npm", "start"]
