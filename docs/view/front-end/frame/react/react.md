# CRA(create-react-app)

### 1.安装
```
npx create-react-app my-app
cd my-app
npm start
```

### 2.使用
```
npx create-react-app my-app
```

### 3.开发
- 在vscode中使用装饰器tslint报错的解决方法，跟下创建jsconfig.json
```json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

### 4.部署
- history模式下
```bash
  loaction / {
		root root/paths;
		index index.html;
		# history 模式下，刷新页面请求的服务地址可能报404，此时需要重定向到初始化位置
		try_files $uri /index.html;
	}
```
