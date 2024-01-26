FROM node:lts
WORKDIR /my-project
COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "run","start"]
