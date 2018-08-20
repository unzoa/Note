### 初始化

	git config --global user.name "unzoa"
	git config --global user.email "unzoa@xxx.com"

	创建文件夹unoza
	git init

####  和github关联

	* 删除原来的秘要

	* 生成ssh秘a钥
	ssh-keygen -t rsa -C "unzoa@xxx.com"

	* 测试ssh
	ssh -T git.github.com

#### 提交修改过的项目

	* git add .    
	* git commit -a -m 'commit'   
	* git pull 
	* git push

#### 解决 warning：LF will replace CRLF

	windows中的换行符为 CRLF， 而在linux下的换行符为LF，所以在执行add . 时出现提示，解决办法：
	* rm -rf .git  // 删除.git
	* git config --global core.autocrlf false  //禁用自动转换

	然后重新执行：
	* git init  
	* git add .

#### key 挂掉了

	* 如果之前用过需要清理原来的rsa，执行命令：mkdir key_backup $ cp id_rsa* key_backup $ rm id_rsa*

	* ssh-keygen -t rsa -C 132336218@qq.com

	* 复制id_rsa.pub到github ssh key

	* ssh -T git@github.com