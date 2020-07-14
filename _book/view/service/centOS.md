# centOS

> [教程](https://blog.csdn.net/liliang_11676/article/details/79213238)

## Start

- 链接远程服务器

```bash
ssh root@ip
# 输入密码
```

## 安装模块

```bash
install node
install nginx
```

### Nginx

- 操作

```bash
cd /usr/local/nginx/sbin

# 启动
nginx

# 重启
nginx -s reload

# 停止
nginx -s stop

# 推出
nginx -s quit
```

- 配置

```bash
  listen 80
  root /project/
```

## vim使用

```bash
# 打开文件
vim file

# 开始编辑
i

# 保存文件
# 保存并推出
:wq

# 仅推出
:q!

# 保存文件，不退出
:w
```

## 同步文件

- Server上文件位置

```bash
  |-root
  |-|-project
  |-|-|-docs
```

- 导入静态项目

**Step 1.** 进入本地路径

```bash
# 打包文件
tar -zcvf folder.tar.gz folder
scp filename.format root@ip:/serverFolderIWant
scp -r ./docs root@ip:/serverFolderIWant
```

**Step 2.** 服务上

```bash
# 查看上传的文件
cd project && ls

# 解压文件
tar -xvf fileName

# 删除文件
rm fileName.format

# 删除文件夹
rm -rf floder
```

### 关于scp

```bash
# 把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下
scp /home/work/source.txt work@192.168.0.10:/home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下
scp work@192.168.0.10:/home/work/source.txt /home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下
scp work@192.168.0.10:/home/work/source.txt work@192.168.0.11:/home/work/

# 拷贝文件夹，加-r参数
scp -r /home/work/sourcedir work@192.168.0.10:/home/work/
```
