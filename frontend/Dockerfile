FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV VITE_API_URL=http://backend:9000
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]