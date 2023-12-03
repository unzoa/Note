# MYSQL

> 在宿主机上直接安装
> mysql  Ver 8.0.35-0ubuntu0.22.04.1 for Linux on x86_64 ((Ubuntu))

```bash
sudo apt-get install mysql

mysql -u root -p # 首次进入没有密码

# 创建个管理员用户
CREATE USER 'username'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'username'@'%';
FLUSH PRIVILEGES;
```

## 配置cnf

```bash
vim /etc/mysql/mysql.conf.d/mysqld.cnf
```


### 远程连接

```conf
# 从 127.0.0.1 改成 0.0.0.0
bind-address            = 0.0.0.0
mysqlx-bind-address     = 0.0.0.0
```


### 字符集问题


```conf
[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4

[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
init_connect='SET NAMES utf8mb4'
```

### 重启
```bash
sudo systemctl restart mysql

# 查看编辑结果
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';
```

### error

> ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client

```
ALTER USER 'username'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
```



