# First use

- mac上需要在'系统偏好设置'中MySQL中start MySQL Server；
- 第一次使用需要自定义密码；

```bash
cd /usr/local/mysql/bin/

sudo su
# 输入mac的管理员密码

# 禁止mysql验证功能
./mysqld_safe --skip-grant-tables &
# 回车后mysql会自动重启（偏好设置中mysql的状态会变成running）

./mysql
FLUSH PRIVILEGES;
SET PASSWORD FOR 'root'@'localhost' = PASSWORD('你的新密码');
```