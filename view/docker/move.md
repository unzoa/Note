# 移动

## mysql

### 导出数据库

```bash
# 导出容器A的数据库备份文件
docker exec -it mysql_task_reports mysqldump -u root -p --databases task_report > ./db_task.sql
# mysql_task_reports 容器名
# task_report        数据库名
# ./db_task.sql      要导出的文件名

# 有报错

# 登陆进入docker中，使用msyqldump命令导出task_report数据库
docker exec -it mysql_task_reports bash
mysqldump -u root -p --databases task_report > ./db_task.sql
exit
```

### 导出mysql镜像

```bash
docker save -o mysql_task.tar mysql:5.7
```
### 导入景象

```bash
docker load -i mysql_task.tar
```

### 导入数据库

```bash
docker exec -it task_mysql bash

# mysql 加载sql文件
mysql -u root -p task_report < ./db_task.sql
```



