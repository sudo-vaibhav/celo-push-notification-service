FROM node:latest

RUN npm i -g truffle

WORKDIR /app

COPY ["package.json", "yarn.lock","./"]
RUN yarn install
COPY . .

CMD ["truffle", "test"]
