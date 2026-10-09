FROM node:22-alpine

WORKDIR /app

COPY database/package.json ./database/package.json
RUN cd database && npm install --omit=dev

COPY database/ ./database/
COPY backend/product-service/ ./service/

WORKDIR /app/service

COPY backend/product-service/package.json ./
RUN npm install --omit=dev

EXPOSE 4001

USER node

CMD ["node", "server.js"]