FROM node:18.15
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
# 暴露你的应用监听的端口
EXPOSE 8080
COPY . .
CMD ["node", "./index.js"]

# docker push yohane0w0/owobot:latest