# Step 1: Use official Node image
FROM node:18-alpine

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy dependency files
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy everything else
COPY . .

# Step 6: Generate Prisma client (if using Prisma)
RUN npx prisma generate

# Step 7: Expose port (adjust to your backend port)
EXPOSE 5000

# Step 8: Start server (adjust to your start script)
CMD ["node", "src/app.js"]