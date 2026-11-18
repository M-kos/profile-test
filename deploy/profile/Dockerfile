FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:24-alpine as app

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --omit=dev

RUN addgroup -S app \
    && adduser -S app -G app

COPY --from=builder /app/dist ./dist

USER app

EXPOSE 8080

CMD ["node", "dist/main.js"]
