## 解决 warning：LF will replace CRLF

	** http://blog.csdn.net/unityoxb/article/details/20768687
	** rm -rf .git  // 删除.git
	** git config --global core.autocrlf false  //禁用自动转换

## 提交修改过的项目

	* git add .    
	* git commit -a -m 'commit'    
	* git push

## key 挂掉了

	* 如果之前用过需要清理原来的rsa，执行命令：mkdir key_backup $ cp id_rsa* key_backup $ rm id_rsa*

	* ssh-keygen -t rsa -C 132336218@qq.com

	* 复制id_rsa.pub到github ssh key

	* ssh -T git@github.com