# 数据表 相关

```bash
# 创建数据表
create table `表名`
  (`字段名` 字段类型, `字段名` 字段类型);

# 🌰 设置主键
create table personTable
  (personID int, name varchar(20), gender varchar(10), primary key(personID));

# 🌰 设置字段值唯一
create table personTable
  (
    personID int,
    name varchar(20) unique,  # unique 表示这个字段下的值，唯一
    gender varchar(10),
    primary key(personID)
  );

# 展示table下的编码
show create table 表名;

desc 数据表;

# 展示数据表下字段描述
show columns from 数据表;

# 更改table字符集
alter table 表名 convert to character set utf8;

# 删除数据表
drop table 表名;
```

## 查询

```bash
# 统计表行数
select count(*) from 表名;


# 查询全部
select * from 表名;
select 字段名 from 表名;
```

## 增加字段

```bash

# 增加字段
alter tabel 数据表 add 字段名 字段类型;

# 一次添加多个列(字段)
ALTER TABLE table_name
  ADD func varchar(50),
  ADD gene varchar(50),
  ADD genedetail varchar(50);

```

## 更新字段

```bash

# 修改字段名
alter table 数据表
  change 前字段名 后字段名 后类型;

# 修改字段类型
alter table 表名
  modify 字段名称 修改后字段类型;

# 更改某字段值唯一性
alter table 表名 add unique(字段);

# 修改mysql主键（id)的值为自增
alter table 表名
  modify id int auto_increment primary key;

```

## 删除字段

```bash

# 删除字段
alter table 数据表 drop 字段名;

```

## 插入数据

```bash

# 插入新数据
insert into weibo
  (id, text, originImg)
  values(0,?,?)

```

## 更新某一行

```bash

# 更新数据
update students set
  stu_name = "zhangsan",
  stu_gender = "m"
  where stu_id = 5;

# 删除某个字段中的某个字符
update 表名 set
  字段名 = trim(
    both ',' from replace
    (
      concat(',', 字段名, ','),
      ',要删除的字符,',
      ','
    )
  )

# 🌰
# 假如表名为user，表如下

# id	devid
# 1	  1,2,3,12,13,14
# 要删除表user的devid字段中的1的值，注意12,13,13是不能删除。

update user set devid = trim(both ',' from replace(concat(',', devid, ','), ',1,', ',')) where id = '1';

# 拼接某字段和目标字符
update user_type set
  user_id = concat(user_id, ',${user_id}')
  where id = ${id};

```

## 删除行

```
# 删除数据
delete from 数据表 where age = 23;

# 模糊删除
delete from 表名 where 字段 in (值1, 值2, 值...)

```

