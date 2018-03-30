# loaction
	
	listen       8000;
    server_name  localhost;

	* 配置项目路径
	* 总的项目路径就是：root/url/index

		loaction /url {
			root 主路径会加上‘/url’
			index ...
		}

	* 配置代理服务
	* 代理地址：proxy_pass
	* 访问指向代理：localhost:8000/api指向proxy_pass
		
		location /api {
			proxy_pass http://site:8080/
		}

# reload

	nginx -s reload
