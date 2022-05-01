FROM node:14.15

WORKDIR /usr/src/app

# Install dependencies
COPY package.json ./

RUN npm @nestjs/cli
RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run","start:dev" ]