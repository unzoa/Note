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
	* 访问指向代理：server_name:listen/api指向proxy_pass
	
	location /api/ {
		proxy_pass http://server_name:listen/
	}

#### Nginx Help
	start nginx
	nginx -s reload
	nginx -s quit
