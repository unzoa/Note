# 创建自己的镜像

## 镜像 image

### nuxt的部署

1. 创建一个ubuntu的基础系统
2. 安装必要的工具
3. 安装node
4. 安装pm2
5. 部署文件到镜像内
6. 暴露端口

```dockerfile
# 使用特定版本的 Ubuntu
FROM ubuntu:20.04

# 更新并安装必要的工具
RUN apt-get update && \
    apt-get -y upgrade && \
    apt-get -y install wget curl xz-utils build-essential

# 安装特定版本的 Node.js, 记得替换下面的 `14.17.1` 到你想要使用的版本
RUN curl -fsSL https://nodejs.org/dist/latest-v18.x/node-v18.19.1-linux-x64.tar.xz | tar -xJv --strip-components=1 -C /usr/local/
RUN npm i -g pm2

WORKDIR /app

ADD ecosystem.config.cjs /app
ADD .output /app/.output
ADD reports /app/reports

EXPOSE 3000
```

## 多容器 compose

```yml
version: '3'
services:
  node:
    build:
      context: .
      dockerfile: dockerfile
    ports:
      - "3001:3000"
    volumes:
      - ./.output:/app/.output
      - ./reports:/app/reports
    command: "pm2-runtime ecosystem.config.cjs"
    restart: always
```
