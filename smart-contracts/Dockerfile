FROM node:alpine
RUN apk add --no-cache git
RUN yarn global add truffle

WORKDIR /app

COPY ["package.json", "yarn.lock","./"]
RUN yarn install
COPY . .

CMD ["truffle", "test"]
