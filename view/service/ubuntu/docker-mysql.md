# Docker MySQL


## 拉取

```bash
# 最新版本
docker pull mysql
# 5.7 版本 本文基于5.7版本
docker pull mysql:5.7
```

```bash
docker ps

CONTAINER ID   IMAGE       COMMAND                  CREATED       STATUS          PORTS                                                  NAMES
eabb348d7ac1   mysql:5.7   "docker-entrypoint.s…"   8 hours ago   Up 14 minutes   0.0.0.0:3306->3306/tcp, :::3306->3306/tcp, 33060/tcp   mysql
```


## 启动mysql容器 查看数据文件存放路径

```bash
docker run -d \
-p 3306:3306 \
--name mysql \
-e MYSQL_ROOT_PASSWORD=123  \
mysql:5.7

docker exec -it mysql bash

mysql -u root -p
# Enter password:

# mysql> show variables like '%datadir%';

+---------------+-----------------+
| Variable_name | Value           |
+---------------+-----------------+
| datadir       | /var/lib/mysql/ |
+---------------+-----------------+
1 row in set (0.00 sec)
```

## 退出mysql docker到宿主机

```bash
exit
```

## 拷贝容器配置文件

```bash
# mysql容器的配置文件存在 /etc/mysql 下
# /usr/local/ 下如果没有mysql目录，手动创建，不必创建conf
docker cp mysql:/etc/mysql /usr/local/mysql/conf
```

## 重启容器

```bash
docker run -d \
-p 3306:3306 \
--name mysql \
-v /usr/local/mysql/conf:/etc/mysql \
-v /usr/local/mysql/data:/var/lib/mysql/ \
-e MYSQL_ROOT_PASSWORD=123 \
--restart always  \
mysql:5.7

# /usr/local/mysql/ 下会自动创建data/

```

```bash
docker run -d \
-p 3306:3306 \
--name mysql \
-v /home/app/mysql/conf:/etc/mysql \
-v /home/app/mysql/data:/var/lib/mysql/ \
-e MYSQL_ROOT_PASSWORD=123 \
--restart always  \
mysql:5.7
```

## 备份原数据库，并导入

```bash

# 原宿主机上mysql数据库备份
mysqldump -u root -p 要导出的数据库名>名字随意.sql
# scp到目标服务器上

# 导入到docker中
docker cp xx/xx.sql mysql:/

# 加载sql文件

docker exec -it mysql bash

mysql -u root -p

create database xx;
use xx;
source /xx.sql;

# 数据导入成功可以查询后，删除容器，并重新用命令创建容器，查看数据存在。
docker stop mysql && docker rm mysql

# 重启docker，命令同上
```


## Navicat 连接

```bash

# error 1
# A: 服务器 安全组增加3306访问

# error 2： access denied for user root
# A： 没有在其他ip地址上访问的权限。需要登录mysql然后修改权限。
GRANT ALL PRIVILEGES ON *.* TO'root'@'%' IDENTIFIED BY '123' WITH GRANT OPTION;

FLUSH PRIVILEGES;

# **A**: passowrd 是 123， 不是服务器密码，干
```

## 字符集问题，挂在配置文件my.cnf

```bash
# 各论坛提到的位置是容器内 /etc/mysql/my.cnf，但是本次拉取的mysql镜像中没有
# 但有 /etc/my.cnf

# 宿主机下
docker cp mysql:/etc/my.cnf /usr/local/mysql/conf

# 编辑字符集配置
```

```conf
# For advice on how to change settings please see
# http://dev.mysql.com/doc/refman/5.7/en/server-configuration-defaults.html

[mysqld]
#
# Remove leading # and set to the amount of RAM for the most important data
# cache in MySQL. Start at 70% of total RAM for dedicated server, else 10%.
# innodb_buffer_pool_size = 128M
#
# Remove leading # to turn on a very important data integrity option: logging
# changes to the binary log between backups.
# log_bin
#
# Remove leading # to set options mainly useful for reporting servers.
# The server defaults are faster for transactions and fast SELECTs.
# Adjust sizes as needed, experiment to find the optimal values.
# join_buffer_size = 128M
# sort_buffer_size = 2M
# read_rnd_buffer_size = 2M
skip-host-cache
skip-name-resolve
datadir=/var/lib/mysql
socket=/var/run/mysqld/mysqld.sock
secure-file-priv=/var/lib/mysql-files
user=mysql

# add
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
# add end

# Disabling symbolic-links is recommended to prevent assorted security risks
symbolic-links=0

#log-error=/var/log/mysqld.log
pid-file=/var/run/mysqld/mysqld.pid

# add
[mysql]
default-character-set = utf8mb4
# add end

[client]
# add
default-character-set = utf8mb4
# adde end
socket=/var/run/mysqld/mysqld.sock

!includedir /etc/mysql/conf.d/
!includedir /etc/mysql/mysql.conf.d/
```

### 查看字符集
```bash
# 进入容器 mysql
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
```

## 镜像导出

> [介绍](https://juejin.cn/post/6850418117420843021)
