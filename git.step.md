## 解决 warning：LF will replace CRLF

	** http://blog.csdn.net/unityoxb/article/details/20768687
	** rm -rf .git  // 删除.git
	** git config --global core.autocrlf false  //禁用自动转换

## 初始化

	git config --global user.name "unzoa"
	git config --global user.email "unzoa@xxx.com"

	创建文件夹unoza
	git init

###  和github关联

	0，删除原来的秘要

	1，生成ssh秘a钥
	ssh-keygen -t rsa -C "unzoa@xxx.com"

	2，测试ssh
	ssh -T git.github.com

## 提交修改过的项目

	* git add .    
	* git commit -a -m 'commit'   
	* git pull 
	* git push

## key 挂掉了

	* 如果之前用过需要清理原来的rsa，执行命令：mkdir key_backup $ cp id_rsa* key_backup $ rm id_rsa*

	* ssh-keygen -t rsa -C 132336218@qq.com

	* 复制id_rsa.pub到github ssh key

	* ssh -T git@github.com