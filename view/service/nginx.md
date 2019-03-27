### Config
	
	listen       8000;
    server_name  localhost;

	* 配置项目路径
	* server_name:listen/locationName = root/locationName
    * 访问：server_name:listen/locationName/paths/fileName
    * 文件内：/locationName/paths/fileName
    * 文件内：./

	loaction /path {
		root 'root/locationName/paths/';
		index index.html;
	}

	* 配置代理服务
	* 代理地址：proxy_pass
	* 访问指向代理：server_name:listen/api/ 指向 proxy_pass/api/
	
	location /api/ { # api这个前缀，后端也需要配置
		proxy_pass http://server_name:listen/
	}

#### Nginx Help
	start nginx
	nginx -s reload
	nginx -s quit

#### 记录版本号
	- 建立两个js文件，ver-tmp.js, ver.js，格式需要完全一样
	- ver-tmp
		const ver = $WCREV$
		export default ver
	- ver，程序内引用
		const ver = 596
		export default ver
	- subwcrev . ver-tmpl.js ver.js 执行模版

	vue程序
	- 建立.bat在windows下可运行
		cd .\src\assets\js
		subwcrev . ver-tmpl.js ver.js
		cd ../../../
		npm run build
	- package.json
		"win-build": "build.bat"
	- build for production
		npm run win-build
