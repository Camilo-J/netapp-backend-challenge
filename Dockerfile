FROM oven/bun:latest

WORKDIR /app

COPY package.json ./
COPY bun.lock ./
COPY prisma ./prisma
COPY src ./
COPY index.ts ./
COPY tsconfig.json ./


RUN bun install

RUN bunx prisma migrate && bunx prisma generate

EXPOSE 3001

CMD ["bun", "start"]