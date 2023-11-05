# Docker Nginx

## check list

```bash
docker search nginx

# can see Official
NAME                               DESCRIPTION                                     STARS     OFFICIAL   AUTOMATED
nginx                              Official build of Nginx.                        19188     [OK]
```

## pull

```bash
docker pull nginx:latest

# check images
docker images
```

## 挂载配置文件

### 创建相关目录

```bash
mkdir -p /usr/docker/nginx/html
mkdir -p /etc/docker/nginx/{conf.d,logs}
```

### 启动

```bash
docker run \
  --name nginx \
  -d -p 8008:80 --net host \
  nginx:latest
```

```bash
docker run \
  --name nginx \
  -d -p 8008:80 --net host \
  -v /usr/docker/nginx/html:/usr/share/nginx/html \
  nginx:latest
```

```bash
docker run \
  --name nginx \
  -d -p 8008:80 --net host \
  -v /home/app/nginx/html:/usr/share/nginx/html \
  nginx:latest
```

**注意！注意！注意！：**

启动nginx容器时 一定要加 --net host 参数 （解释：容器将不会虚拟出自己的网卡，配置自己的IP等，而是使用宿主机的IP和端口。）
个人理解：如果不加此参数，nginx相当于是代理nginx镜像的IP及端口，因为nginx镜像也是独立的虚机，贴上此图，便于理解
```
|----------------------|
|  |    ---------  |   |
|  |    | nginx |  |   |
|  |    ---------  |   |
|  |   Docker      |   |
|  -----------------   |
|    宿主机             |
|----------------------|
```

#### 报错

```bash
WARNING: Published ports are discarded when using host network mode
ca0d4f4d11300c4dac3acff24d6063c72f0eb8c0403b07a4fff57359a6d436f4
docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: error mounting "/etc/docker/nginx/nginx.conf" to rootfs at "/etc/nginx/nginx.conf": mount /etc/docker/nginx/nginx.conf:/etc/nginx/nginx.conf (via /proc/self/fd/6), flags: 0x5001: not a directory: unknown: Are you trying to mount a directory onto a file (or vice-versa)? Check if the specified host path exists and is the expected type.
```

docker nginx:/etc/nginx/nginx.conf

```conf
user  nginx;
worker_processes  auto;

error_log  /var/log/nginx/error.log notice;
pid        /var/run/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}
```


