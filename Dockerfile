FROM node:18.16.1

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm install -g npm@9.5.1

RUN npm install

RUN npm run build

EXPOSE 8080

CMD [ "npm", "start" ]
