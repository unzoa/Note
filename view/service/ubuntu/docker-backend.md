# Docker Backend

> 用一个ubuntu环境，安装nvm、pm2

## 拉取

```bash
docker search ubuntu # check list

docker pull ubuntu

docker images # check images ok
```

## 启动和挂载

```bash
docker run -itd --name backend -p 1992:1992 -v /home/app/backend:/home ubuntu
```



## 安装nvm、pm2


### nvm

> 通过安装包安装

```bash
mkdir -p  /root/.nvm

tar -zxvf v0.38.0.tar.gz -C /root/.nvm

# 更改bashrc，尾部添加
export NVM_DIR="$HOME/.nvm/nvm-0.38.0"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
# This loads nvm bash_completion
# nodejs下载更换淘宝镜像
export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node

# 加载更改
soiurce .bashrc

# check
nvm -v  # 0.38

nvm install 14
# error
# nvm needs curl or wget to proceed.

apt update
apt install curl
curl --version

nvm install 14
node -v
# v14.21.3
```

### pm2

```bash
npm i pm2 -g
```



