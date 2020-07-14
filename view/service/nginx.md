# Nginx

## 打开配置文件

- Mac上打开配置

```bsh
open /usr/local/etc/nginx/
# nginx.conf
```

- Windows

直接找到nginx文件夹，打开 nginx.conf

## 配置

```nginx
...

listen       port;
server_name  localhost;

# 配置项目路径
# server_name:listen/ 相当于 root/paths
# 访问：server_name:listen

loaction / {
  root root/paths;
  index index.html;
  # history 模式下，刷新页面请求的服务地址可能报404，此时需要重定向到初始化位置
  try_files $uri /index.html;
}

# 配置代理服务
# 代理地址：proxy_pass, 结尾处带斜杠，访问指向的地址会删除前缀；反之，不删除。
# 访问：server_name:listen/前缀/sth/
# proxy_pass/ 指向 proxy_pass/sth/
# proxy_pass  指向 proxy_pass/前缀/sth/

location /api {
  proxy_pass http://server:port;
}
location /user {
  proxy_pass http://server:port;
}

...
```

## 接口匹配

```js
  ajax.get('/api/haha/') // react history模式
  // 或者
  ajax.get('api/haha/') // vue hash模式
```

## Help

```bash
  start nginx
  nginx -s reload
  nginx -s quit
```

## 记录版本号

> 在windows上实现，只记录提交者机器上的版本好

- 建立两个js文件，ver-tmp.js, ver.js，格式需要完全一样

```js
// ver-tmp.js
const ver = $WCREV$
export default ver

// ver.js，程序内引用
const ver = 596
export default ver
```

- 执行模版

```bash
subwcrev . ver-tmpl.js ver.js
```

- 程序应用

```bash
# 建立.bat在windows下可运行
cd .\src\assets\js
subwcrev . ver-tmpl.js ver.js
cd ../../../
npm run build

# package.json
"win-build": "build.bat"

# build for production
npm run win-build
```
