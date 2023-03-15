FROM node:18
WORKDIR /react
COPY package.json .
RUN npm install
RUN npm install -g yarn
COPY . .
CMD ["PORT=80", "yarn", "start"]
