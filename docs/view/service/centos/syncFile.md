# 同步文件

- Server上文件位置

```bash
  |-root
  |-|-project
  |-|-|-docs
```

- 导入静态项目

**Step 1.** 进入本地路径

```bash
# 打包文件
tar -zcvf folder.tar.gz folder
scp filename.format root@ip:/serverFolderIWant
scp -r ./docs root@ip:/serverFolderIWant
```

**Step 2.** 服务上

```bash
# 查看上传的文件
cd project && ls

# 解压文件
tar -xvf fileName

# 删除文件
rm fileName.format

# 删除文件夹
rm -rf floder
```

## 关于scp

```bash
# 把本地的source.txt文件拷贝到192.168.0.10机器上的/home/work目录下
scp /home/work/source.txt work@192.168.0.10:/home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到本地的/home/work目录下
scp work@192.168.0.10:/home/work/source.txt /home/work/

# 把192.168.0.10机器上的source.txt文件拷贝到192.168.0.11机器的/home/work目录下
scp work@192.168.0.10:/home/work/source.txt work@192.168.0.11:/home/work/

# 拷贝文件夹，加-r参数
scp -r /home/work/sourcedir work@192.168.0.10:/home/work/
```
