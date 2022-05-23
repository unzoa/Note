# Nginx

> [参考](https://www.cnblogs.com/jeffhong99/p/11362361.html)

```bahs
# 安装nginx
yum -y install nginx

# 安装成功后nginx的几个默认目录

# 输入命令:
whereis nginx
# 输出
# 执行目录：/usr/sbin/nginx
# 模块所在目录：/usr/lib64/nginx/modules
# 配置所在目录：/etc/nginx/
# 默认站点目录：/usr/share/nginx/html

# 主要配置文件：/etc/nginx/nginx.conf
# 指向：/etc/nginx/conf.d/default.conf


# 启动
/usr/sbin/nginx

# 重启
cd /usr/sbin
./nginx -s reload

# 停止
cd /usr/sbin
./nginx -s stop
```