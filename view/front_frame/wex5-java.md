# Wex5
> Java 部署

**Step 1.** 部署包root/mysql/my.ini 修改数据库端口-#port=... => port = xxxx
（为防止和已有的数据库乱掉）

**Step 2.** x5-窗口-首选项-数据源-修改端口

**Step 3.** 打包
```
	ip-服务器+8080
	weburl- /myitem
```

**Step 4.** 部署发布包
```
	UI- Native下myitem/www/ 复制到部署包apache-tomcat/webapps/ ,将部署包apache-tomcat/webapps/app-template/WEB-INF文件夹复制到项目下
	BaasServer- x5root/runtime/BaasServer拷贝到部署包 runtime下
	数据库配置文件- x5root/apache-tomcat/conf/context.xml 拷贝到部署包同位
	数据库驱动文件- x5root/apache-tomcat/lib/ mysql-connector-java-5.1.36-bin.jar拷贝到部署包同位
```

**Step 5.** IIS部署
```
	域名或者ip+端口 指向
```
