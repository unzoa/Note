1，绑定账户
$ git config --global user.name ""
$ git config --global user.email ""

2,为github账户设置SSH key
** github加密算法是rsa，发送给github的是加密过的公钥public key，然后用传递回来的（用公钥加密过的数据），可以用本地的私钥还原，如果丢失了，重新再github里面再次设置
**  cd ~/.ssh   ls 打印三个文件，已经有秘钥，id_rsa.pub就是公钥
**  如果没有 $ ssh-keygen -t rsa -C “6215048wjl@163.com”
** 生成成功后，去对应目录用记事本打开id_rsa.pub，得到ssh key公钥   用户/name/.ssh/id_rsa.pub，复制后粘贴到github setting shh addnew

3，执行git
git init //把这个目录变成Git可以管理的仓库
git add .    //添加项目到仓库内

**** 解决 warning：LF will replace CRLF
** http://blog.csdn.net/unityoxb/article/details/20768687
** rm -rf .git  // 删除.git
** git config --global core.autocrlf false  //禁用自动转换

git commit -m '注释

git remote add origin git@github.com:wangjiax9/practice.git //关联远程仓库

4，clone，pull同步，push发布
* 从github上clone项目 
** git clone 项目的地址

* 提交修改过的项目
* git add .    
* git commit -a -m 'commit'    
* git push