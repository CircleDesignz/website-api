FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

# RUN npm ci --only=production (for production builds)
RUN yarn install

COPY . .

CMD ["node", "dist/main"]
