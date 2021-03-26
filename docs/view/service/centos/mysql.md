# centos7 安装mysql5.7

[参考](https://blog.csdn.net/wohiusdashi/article/details/89358071)

1. 安装YUM Repo

```bash
  # 下载
  wget https://dev.mysql.com/get/mysql57-community-release-el7-9.noarch.rpm


  # 安装
  rpm -ivh mysql57-community-release-el7-9.noarch.rpm
  # 校验
  # 执行完成后会在/etc/yum.repos.d/目录下生成两个repo文件mysql-community.repo mysql-community-source.repo
```

2. 使用yum命令即可完成安装

**注意：必须进入到 /etc/yum.repos.d/目录后再执行以下脚本**

```bash
  # 安装
  yum install mysql-server
  # 一路y，傻瓜安装

  # 启动
  systemctl start mysqld

  # 获取安装时的临时密码
  grep 'temporary password' /var/log/mysqld.log // O11RdxUQ5M=D
  # 2020-11-02T08:56:09.728544Z 1 [Note] A temporary password is generated for root@localhost: fO*Ti+oeL6)c

  # 登录验证
  mysql -u root -p;
  Enter password: fO*Ti+oeL6)c;

```

3. 登录成功

```bash
  # 首次使用修改密码
  set password for 'root'@'localhost' = '密码';
```

4. 修改mysql存储emoji

```bash
# /etc 下创建my.cnf, 并修改内容

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'

# 重启
systemctl restart mysqld

# 查看编辑结果
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
```

