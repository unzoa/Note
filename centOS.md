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
- vim
    + 打开文件 vim file
    + 开始编辑 i
    + 保存文件
        * :wq 保存并推出
        * :q! 仅推出
        * :w  保存文件，不退出
- 跟下
    + project
        * docs
- 导入静态项目
    + 进入本地路径
        * 打包文件 tar -zcvf folder.tar.gz folder
        * scp filename.format root@ip:/serverFolderIWant
        * scp -r ./docs root@ip:/serverFolderIWant
    + cd project && ls 查看上传的文件
        * 解压文件 tar -xvf fileName
        * 删除文件 rm fileName.format
        * 删除文件夹 rm -rf floder