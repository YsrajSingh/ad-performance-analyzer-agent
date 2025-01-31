FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Set the environment variable from Docker Compose
ENV VITE_API_URL=${VITE_BACKEND_URL}

EXPOSE 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
