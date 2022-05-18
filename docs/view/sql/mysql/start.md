# Mac下安装

1. 安装

  [下载](https://dev.mysql.com/downloads/mysql/)傻瓜式安装即可！

2. 配置环境变量

  首先找到配置文件
  /etc/profile
  在后面输入export路径
  export PATH=$PATH: /usr/local/mysql/bin

3. 执行source 命令

  ```bash
  source /etc/profile
  ```

4. zsh中每次启动都需要重新执行步骤3的解决

  在用户下找到
  .zshrc
  同样在最后一行添加
  export PATH=$PATH: /usr/local/mysql/bin

最后执行步骤3
结束！

## 首次使用

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
