# Git

## 初始化

```bash
git config --global user.name "unzoa"
git config --global user.email "unzoa@xxx.com"

# 创建文件夹unoza
git init
```

## 和github关联

```bash
# 删除原来的秘要

# 生成ssh秘a钥
ssh-keygen -t rsa -C "unzoa@xxx.com"

# 测试ssh
ssh -T git.github.com

# 提交修改过的项目
git add .
git commit -a -m 'commit'
git pull
git push

# 删除仓库文件 or 文件夹
git rm -r --cached folder/filename
git rm -r --cached folder
git commit -m'xxx'
git push
```

## 解决 warning：LF will replace CRLF

```bash
# windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示，解决办法：

# 删除.git
rm -rf .git

# 禁用自动转换
git config --global core.autocrlf false

# 然后重新执行：
git init
git add .
```

## key 挂掉了

```bash
# 如果之前用过需要清理原来的rsa，执行命令：
mkdir key_backup
cp id_rsa* key_backup
rm id_rsa*

ssh-keygen -t rsa -C name@xx.com

# 复制id_rsa.pub到github ssh key

ssh -T git@github.com
```
