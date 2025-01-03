FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

RUN pnpm prisma generate

RUN pnpm prisma migrate deploy

RUN pnpm build

CMD ["pnpm", "start:prod"]
