FROM node:20-slim

WORKDIR /app

# Install dependencies from the lockfile so the image is reproducible.
COPY package*.json ./
RUN npm ci

# Copy the project; in development docker compose overlays this with a bind
# mount, and an anonymous volume keeps the image's node_modules in place.
COPY . .

# Polling keeps hot reload working when the source is a bind mount.
ENV CHOKIDAR_USEPOLLING=true
ENV WATCHPACK_POLLING=true

EXPOSE 3000

CMD ["npm", "start"]
