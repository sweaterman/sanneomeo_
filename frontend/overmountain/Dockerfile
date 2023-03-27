FROM node:18
WORKDIR /react
COPY package.json .
RUN npm install
COPY . .
CMD [ "yarn", "start"]