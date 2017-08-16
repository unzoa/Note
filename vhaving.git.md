V联网1.0

创建git用户信息
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"

产生密钥
ssh-keygen
cat ~/.ssh/id_rsa.pub

6.22  
商城  git clone git@git.coding.net:maoxfjob/vhaving_shangcheng.git
后台  git clone git@git.coding.net:maoxfjob/vhaving_houtai.git     
汽车  git clone git@git.coding.net:tiandilou/autoweb.git
 
推送

git add .
git commit -m"commit"
git pull  获取
git push  推送

git切换分支
git checkout yhy
git add .
git commit -m ""
git pull
git push 
**if not work,try the func down here**
git push origin dev

git reset --hard HEAD^   撤回

xiaofan123

**step**
* git add .
* git commit -m 'somewords'
* git push

* git checkout master
* git pull

* git checkout yhy

* git add .
* git commit -m 'ss'
* git push