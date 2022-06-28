FROM node:12
WORKDIR /workspace
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD [ "npm", "run","start" ]