FROM node:22.21-alpine3.21

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY app.js ./

COPY . .

RUN npm run test

RUN rm -rf test && rm -rf node_modules

RUN npm install --prod

CMD ["npm", "start"]