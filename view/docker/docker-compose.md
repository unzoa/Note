# 创建自己的镜像

## 镜像 image

### dockerfile

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

### 可单独build

> 一个纯净ubuntu，安装了必要软件后，需要有一个进程一直运行才能保证运行起来不退出

创建一个run.sh
```shell
#!/bin/bash

while true; do
    sleep 1000
done
```

然后dockerfile中
```dockerfile
WORKDIR /app

COPY run.sh run.sh

RUN chmod +x run.sh

# 设置容器启动后执行的命令
CMD ["./run.sh"]
```

```bash
docker build -t imageName:version .
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
