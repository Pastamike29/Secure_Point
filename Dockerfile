# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy all files
COPY . .

# Expose React port
EXPOSE 5173

# Start React app
CMD ["npm", "start"]
