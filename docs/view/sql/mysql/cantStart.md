# Mac 在设置中启动mysql失效

1. 关闭mysql服务器
sudo /usr/local/mysql/support-files/mysql.server stop

2. 进入目录
cd /usr/local/mysql/bin

3. 获取权限
sudo su

4. 重启服务器
./mysqld_safe --skip-grant-tables &

5. control + D退出编辑

6. 配置短命令
alias mysql=/usr/local/mysql/bin/mysql

7. 进入mysql命令模式
mysql