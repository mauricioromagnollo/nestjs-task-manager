FROM node:17-slim

WORKDIR /nestjs-task-manager/

COPY package.json package-lock.json /nestjs-task-manager/

RUN npm i --silent

COPY . .

USER node

CMD npm run start:dev
