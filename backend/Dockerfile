FROM node:12-slim

RUN apt-get update && apt-get install -y git
RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY prisma ./prisma/
COPY tsconfig.json ./
COPY src ./src/
COPY codegen.yml ./
RUN npm install

RUN npm run build
COPY src/schema.graphql ./dis/
RUN npx prisma generate

RUN npm run generate

CMD ["npm", "run", "deploy"]