FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN npm ci

EXPOSE 8000
CMD [ "npm", "run", "dev" ]