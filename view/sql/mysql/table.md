# 数据表 相关

## 创建表

```sql
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

# 展示数据表下字段描述
desc 数据表;
show columns from 数据表;

# 更改table字符集
alter table 表名 convert to character set utf8;

# 删除数据表
drop table 表名;

# 复制表
# 只复制表结构（没有表数据
create table moneyTmp like moneyTable;

# 复制数据到新表
insert into weibo2(id,text) select id,user_text from weibo;

```

## 查询

**结尾加\G,会格式化输出**

```sql
# 统计表行数
select count(*) from 表名;

# 查询全部
select * from 表名;
select 字段名 from 表名;

# 条件查询
select * from 表 order by id;

# 反序
select * from 表 desc;

# 限制条数
select * from 表 limit 10;

# 模糊查询
# IFNULL(字段, '如果值是null，要替换的值')
select * from 表
  where concat(name,IFNULL(retweeted_name, '')) like '%模糊字段%';

# 多条件查询
select * from 表
  where concat(name,IFNULL(retweeted_name, '')) like '%模糊字段%'
  and id <= 100;

# 排除值查询
select * from 表
  where 字段 not in 要排除的合集字符串;
```

## 增加字段

```sql

# 增加字段
alter tabel 数据表 add 字段名 字段类型;

# 一次添加多个列(字段)
ALTER TABLE table_name
  ADD func varchar(50),
  ADD gene varchar(50),
  ADD genedetail varchar(50);

```

## 修改字段

```sql
# 修改字段名
alter table 数据表 change 前字段名 后字段名 后类型;

# 修改字段类型
alter table 表名 modify 字段名称 修改后字段类型;

# 更改某字段值唯一性
alter table 表名 add unique(字段);

# 修改mysql主键（id)的值为自增
alter table 表名 modify id int auto_increment primary key;

# 更改字段顺序
alter table 表名 modify 字段1 字段1类型	after 字段2;
```

## 删除字段(列)

```sql
# 删除字段
alter table 数据表 drop 字段名;

```

## 插入数据

```sql
# 插入新数据
insert into weibo
  (id, text, originImg)
  values(0,?,?)
```

### 若主键存在则更新

```js
const keys = ['user_id', 'list_id', 'anchor']
const values = [user_id, list_id, anchor]
const updData = keys.map((k, ind) => {
  return `${k}=${values[ind]}`
}).join()

$SQL(`insert into
  user_view_anchor(${ keys.join()}) values(${values.join()})
  on duplicate key
  update ${updData}`)
```

## 更新数据

```sql
# 更新数据
update students set
  stu_name = "zhangsan",
  stu_gender = "m"
  where stu_id = 5;

# 字段值增加新值
update 表 set 字段 = concat(字段, '新值') where id = 行id;

# 删除某个字段中的某个字符
# 替换字段值的某一段为什么 replace(字段, '要去掉的内容', '要替换的值')
update 表名 set
  字段名 = replace(
    字段名,
    '要删除的字符',
    '要替换的值'
  )
  where id = 行id;

# trim
update 表
  set 字段 = trim( # trim 删除语句中的前后不必要的字符
    both ','      # trim 提供的选项，此处意为删除','英文逗号
    from replace(concat(',', 字段, ','), ',要去掉的内容,', ',')
  )
  where id = 行id;

# 🌰🌰🌰
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

```sql
# 删除数据
delete from 数据表 where age = 23;

# 模糊删除
delete from 表名 where 字段 in (值1, 值2, 值...)
```

