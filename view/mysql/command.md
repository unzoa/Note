# 常用命令

```bash
show databases;
# 目前拥有的数据库

create database 数据库名;
# 创建数据库

use 数据库名
# 切换了要操作的数据库

create table `表名` (`字段名` 字段类型, `字段名` 字段类型);

# 设置主键


show tables;
# 展示本数据库下的数据库表

show columns from 数据表;
# 展示数据表下字段描述

# 增加字段
alter tabel 数据表 add 字段名 字段类型;

# 删除字段
alter table 数据表 drop 字段名;

# 修改字段名
alter table 数据表 change 前字段名 后字段名 后类型;

# 修改字段类型
alter table 表名 modify 字段名称 修改后字段类型;

# 删除数据表
drop table 表名;

# 字符集
alter table 表名 convert to character set utf8;

# 插入新数据
insert into weibo(id, text, originImg) values(0,?,?)

# 查询全部
select * from 表名;
select 字段名 from 表名;

```