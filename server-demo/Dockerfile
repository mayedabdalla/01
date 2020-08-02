FROM node:12-slim

RUN apt-get update && apt-get install -y git
RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

CMD ["npm", "start"]