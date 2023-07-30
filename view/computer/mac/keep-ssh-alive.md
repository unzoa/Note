# 保持ssh唤醒状态

> ssh 连接服务器的时候总是自己掉线，如何保活。macOS 用 ssh 连接服务器的时候总是过一会就断开连接了，原因是客户端没有向服务器定时发送保活的数据包。

## 解决

```bash
# 切换到 root
sudo su

# 找到 ssh 配置目录
cd /etc/ssh/
ls -al

# 能看到里面的内容
# ssh_ 开头的是商户端的配置，就是你连别人的时候使用的配置
# sshd_ 是作为服务器的配置，就是别人连你的时候使用的配置

total 88
drwxr-xr-x   7 root  wheel     224  7 11 16:56 .
drwxr-xr-x  79 root  wheel    2528  7 29 17:15 ..
-rw-r--r--   1 root  wheel  505489  7 11 16:56 moduli
-rw-r--r--   1 root  wheel    1963  7 11 16:56 ssh_config
drwxr-xr-x   2 root  wheel      64  7 11 16:56 ssh_config.d
-rw-r--r--   1 root  wheel    3516  7 11 16:56 sshd_config
drwxr-xr-x   3 root  wheel      96  7 11 16:56 sshd_config.d



# 修改 ssh_config
# 修改 ssh_config 在后面添加
# 后面数字的单位是秒，意思就是每多少秒向服务器发送一个保活数据，配置是 30 秒
ServerAliveInterval 30
```

**保存配置文件即可**
