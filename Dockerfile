FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir /log
EXPOSE 5000
CMD ["npm", "start"]