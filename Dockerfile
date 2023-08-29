FROM node:18.15
WORKDIR /usr/src/app

# 安装 canvas 依赖的库
RUN apt-get update && apt-get install -y \
    build-essential \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    sqlite3
    
# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 运行你的 SQL 脚本文件以创建初始数据库

RUN npm install --unsafe-perm
# 暴露你的应用监听的端口
EXPOSE 8080
COPY . .

COPY initial_file/.env ./.env
RUN sqlite3 lib/database/SQLite.db < initial_file/SQLite.db.sql

CMD ["node", "./index.js"]

# docker push yohane0w0/owobot:latest