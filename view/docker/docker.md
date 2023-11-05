# DOCKER

## 安装使用

### 使用docker

1. 下载docker安装
2. 搜索 tensorflow/tensorflow:latest 并且pull
3. 运行

```bash
# 1.使用docker run命令来启动容器
# 2.可以使用-d参数让容器在后台运行
# 3.可以使用-p参数将容器与主机端口进行绑定
# 4.可以使用--name参数来指定容器名称
# 5. -v 挂载内部目录到物理机中

# /Users/unzoa/Github/tensorflow-v1/:/root [/Users/unzoa/Github/tensorflow-v1/ 物理机目录] [:/root root是docker中目录]

# 8889:8888 [8888 容器内端口] [8889 映射容器端口]
# [ts-v1 运行容器名字] [tensorflow/tensorflow:latest 镜像名字]

docker run -it -p 8889:8888 --name ts-v1 -v /Users/unzoa/Github/tensorflow-v1/:/root  tensorflow/tensorflow:latest

docker run -it -p 7357:3310 --name clamav-1.0 -v /Users/yuhongyu/Downloads/clamav/:/root  clamav/clamav:1.0


# 在外部运行已有容器，
docker start ts-v1
# 并开启终端
docker exec -it ts-v1 /bin/bash
```
