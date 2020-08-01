FROM node:12

RUN mkdir /app
WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

RUN npx prisma generate

CMD ["npm", "start"]