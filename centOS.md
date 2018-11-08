# centOS

## 教程 https://blog.csdn.net/liliang_11676/article/details/79213238

### start
- 链接远程服务器
    + ssh root@ip
    + 输入密码
- install node
- install nginx
    + 操作
        * cd /usr/local/nginx/sbin
        * 启动 ./nginx
        * 重启 ./nginx -s reload
        * 停止 ./nginx -s stop
        * 推出 ./nginx -s quit 
    + 配置
        * listen 80
        * root /project/
- 跟下
    + project
- 导入静态项目
    + 知道本地路径（桌面）scp filename.format root@ip:/folderIWant
        * 打包文件 tar -zcvf folder.tar.gz folder
    + cd project && ls 查看上传的文件
        * 解压文件 tar -xvf fileName
