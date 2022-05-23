# 从mac -> centos

1. 导出sql文件

```bash
　　# cd 要导出到的目录
　　mysqldump -u root -p 要导出的数据库名>名字随意.sql
```

2. 目标主机导入sql文件

```bash
  mysql -u root -p
　show databases;
  create database 数据库名;
　use 数据库名;
　source 将sql文件拖入终端;
```