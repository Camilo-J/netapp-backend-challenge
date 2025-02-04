FROM oven/bun:latest

# Store the current working directory
RUN mkdir -p /home/app

# Copy the current directory contents into the container at /home/app
COPY . /home/app

# Set the working directory to /home/app
WORKDIR /home/app

# Install any needed packages specified in requirements.txt
RUN bun install

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Define environment variable
CMD ["bun", "start"]