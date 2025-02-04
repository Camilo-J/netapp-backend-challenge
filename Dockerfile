FROM oven/bun:latest

# Store the current working directory
RUN mkdir -p /home/app

# Copy the current directory contents into the container at /home/app
COPY . /home/app

# Set the working directory to /home/app
WORKDIR /home/app

RUN bun install

RUN bunx prisma migrate deploy

EXPOSE 3001

CMD ["bun", "start"]