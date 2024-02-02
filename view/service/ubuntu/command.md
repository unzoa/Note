# 命令

## 端口占用

```bash
# 查询端口的进程号
sudo netstat -anp | grep 1992
# 输出
tcp        0      0 0.0.0.0:1992            0.0.0.0:*               LISTEN      1785/docker-proxy
tcp6       0      0 :::1992                 :::*                    LISTEN      1792/docker-proxy


# 根据PID杀死或解决进程程序问题
kill -9 1785
```