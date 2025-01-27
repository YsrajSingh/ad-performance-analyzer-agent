FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
ENV PORT=9000
EXPOSE 9000
CMD ["nodemon", "src/server.js"]