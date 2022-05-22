# Mysql QA

## 解决中文乱码问题

> https://blog.csdn.net/u012410733/article/details/61619656

## 如何存储emoji

> utf8是unicode的实现方式之一
在mysql中utf8是utf8mb3的别称
utf8中,一个字符使用1-3个字节表示,中文3个字节

> MySQL在5.5.3版本之后增加了这个utf8mb4的编码，mb4就是most bytes 4的意思，专门用来兼容四字节的unicode。其实，utf8mb4是utf8的超集，理论上原来使用utf8，然后将字符集修改为utf8mb4，也不会对已有的utf8编码读取产生任何问题。

```sql
--修改数据库:
ALTER DATABASE mydatabse CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

--修改表编码为utf8mb4
ALTER TABLE mytable CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

--修改表字段编码为utf8mb4
ALTER TABLE mytable CHANGE nickname nickname VARCHAR(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

编辑my.cnf文件，添加或修改如下内容：
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

重启MYSQL
```bash
service mysqld restart
```

查看编码字符集
```sql
SHOW VARIABLES WHERE Variable_name LIKE 'character\_set\_%' OR Variable_name LIKE 'collation%';

+--------------------------+--------------------+
| Variable_name            | Value              |
+--------------------------+--------------------+
| character_set_client     | utf8mb4            |
| character_set_connection | utf8mb4            |
| character_set_database   | utf8mb4            |
| character_set_filesystem | binary             |
| character_set_results    | utf8mb4            |
| character_set_server     | utf8mb4            |
| character_set_system     | utf8               |
| collation_connection     | utf8mb4_unicode_ci |
| collation_database       | utf8mb4_unicode_ci |
| collation_server         | utf8mb4_unicode_ci |
+--------------------------+--------------------+
```

## MacOS 在设置中启动mysql失效

```bash
# 1. 关闭mysql服务器
sudo /usr/local/mysql/support-files/mysql.server stop

# 2. 进入目录
cd /usr/local/mysql/bin

# 3. 获取权限
sudo su

# 4. 重启服务器
./mysqld_safe --skip-grant-tables &

# 5. control + D退出编辑

# 6. 配置短命令
alias mysql=/usr/local/mysql/bin/mysql

# 7. 进入mysql命令模式
mysql
```