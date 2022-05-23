# 安装node

```bash

# 安装 wget
yum install -y wget

# 查找node的版本，复制下载链接
wget https://nodejs.org/dist/v14.15.1/node-v14.15.1-linux-x64.tar.xz

# 解压
xz -d node-v14.15.1-linux-x64.tar.xz
tar -xf node-v14.15.1-linux-x64.tar

# 重命名
mv node-v14.15.1-linux-x64 node

ln -s node-v14.15.1-linux-x64/bin/node /usr/bin/node
ln -s node-v14.15.1-linux-x64/bin/npm /usr/bin/npm
ln -s node-v14.15.1-linux-x64/bin/npm /usr/bin/npx

vim ~/.bash_profile

# 在PATH=$PATH:$HOME/bin 后面增加 :~/node/bin

# 测试node
node -v
# 输出版本号 v14.15.1, 成功
```