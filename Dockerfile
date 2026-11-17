FROM node:18-alpine  
WORKDIR /app  
RUN apk add --no-cache python3 make g++  
COPY package*.json ./  
RUN npm install --production  
COPY . .  
RUN mkdir -p /app/data  
EXPOSE 8080  
ENV PORT=8080  
ENV NODE_ENV=production  
CMD ["node", "server.js"] 
