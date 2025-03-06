FROM node:20.17-alpine AS builder

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

WORKDIR /app

COPY package.json ./package.json
COPY yarn.lock yarn.lock

RUN yarn install --frozen-lockfile

COPY . .

RUN chmod +x ./scripts/app.entrypoint.sh
ENTRYPOINT ./scripts/app.entrypoint.sh