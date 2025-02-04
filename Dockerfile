FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lock ./
COPY prisma ./prisma
COPY src ./

RUN bun install

RUN bunx prisma migrate

EXPOSE 3001

CMD ["bun", "start"]