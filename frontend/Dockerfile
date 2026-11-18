FROM node:20-slim

# Install dependencies into the root folder to avoid shadowing from the host volume
WORKDIR /
COPY package*.json ./
RUN npm install

# Set work directory for the application
WORKDIR /app

# Enable polling for hot reload to work in Docker
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

# Ensure the installed node_modules are available in the PATH
ENV PATH /node_modules/.bin:$PATH

# Copy project (will be overlaid by volume in dev)
COPY . .

# Port for React
EXPOSE 3000

# Default command
CMD ["npm", "start"]
