# Node Simple Project

> 一个没有用户的简单后端项目

## 步骤

1. [创建项目](view/back-end/node/node_project?id=_1创建项目)
2. [加载框架](view/back-end/node/node_project?id=_2加载框架)
3. [编写API](view/back-end/node/node_project?id=_3编写API)
4. [数据库](view/back-end/node/node_project?id=_4数据库)
5. [加载CA证书](view/back-end/node/node_project?id=_5加载CA证书)
6. [Nginx代理](view/back-end/node/node_project?id=_6Nginx代理)
7. [守护进程](view/back-end/node/node_project?id=_7守护进程)

## 1.创建项目

```bash
+--config       # 数据库连接、证书加载
+--public       # 静态文件
  +--cert       # CA证书
+--src          # 源码
  +--components # 组件
  +--routes     # API
+--utils        # 公用函数
+--app.js       # 生产入口文件
+--local.js     # 本地入口文件
```

## 2.加载框架

> 使用了koa

```js
// app.js

const Koa = require('koa');
const app = new Koa();

// response
app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(3000);
```

```bash
# 启动
node app.js
```

### 2.1 中间键

```js

// 跨域问题
const cors = require('koa-cors');
app.use(cors())

// ssl
const sslify = require('koa-sslify').default
app.use(sslify())

// 路由(API)
const KOA_ROUTER = require('koa-router');
const ROUTER = new KOA_ROUTER();

app
  .use(ROUTER.routes())
  .use(ROUTER.allowedMethods())
```

## 3.编写API

> 应用中间键 koa-router

### 3.1 🌰

```js
router
  .get('/hello', (ctx, next) => {
    ctx.body = 'Hello World!';

    next()
  })

// API 名字即为 hello
// 调用 http://localhost:3000/hello
```

### 3.2 routes

#### 3.2.1 路由结构

```bash
+--routes
  +--api_1      # 路由
    +--index.js # 路由索引
    +--api_1.js # 路由文件
  + index.js    # 所有路由加载索引
```

#### 3.2.2 所有路由加载索引

```js
const API = [
  require('./api_1')
]

API.forEach(api => {
  ROUTER.get(
    `/${api.name}`,
    (ctx, next) => api(ctx, next)
  )
})

module.exports = ROUTER
```



## 4.数据库

```js
// config

// ...

const MYSQL = require('mysql')

const POOL = MYSQL.createPool({
  connectionLimit : 500,
  host            : '',
  port            : '3306',
  user            : '',
  password        : '',
  database        : ''
})

// ...
```

### 4.1 数据库调用

```js
const { POOL } = require('../config')

function $sql (sql) {
  return new Promise((resolve, reject) => {
    POOL.getConnection((err, connection) => {
      if (err) reject('err: ' + err); // not connected!

      // Use the connection
      connection.query(
        sql,
        (error, results, fields) => {
          // When done with the connection, release it.
          connection.release();

          // Handle error after the release.
          if (error) reject({error, fields});

          // Don't use the connection here, it has been returned to the pool.
          resolve(results)
        }
      );
    });
  })
}

module.exports = $sql
```

## 5.加载CA证书

### 5.1 加载证书

```js
// config

// ...

function pathResolve (dir) {
  return path.join(__dirname, '', dir)
}

const CERT = {
  key: fs.readFileSync(pathResolve('../public/cert/***.com.key')),
  cert: fs.readFileSync(pathResolve('../public/cert/***.com.pem'))
}

// ...
```

### 5.2 应用证书

> app.js 应用 https 模块启动服务

```js
const https = require('https')
const { CERT } = require('./config')

// framework ...
app
  .use(sslify())
  .use(cors())
  .use(ROUTER.routes())
  .use(ROUTER.allowedMethods())

https
  .createServer( CERT, app.callback() )
  .listen(3000, () => {
    console.log(`server running success at 3000`)
  })
```

**本地启动**

> 由于加载了证书，本地开发需要注视掉，启动本地local.js。只使用框架和必要的中间键。

```bash
node loacl.js
```

```js
const Koa = require('koa');
const cors = require('koa-cors');

const app = new Koa();
const ROUTER = require('./src/routes')

app
  .use(cors())
  .use(ROUTER.routes())
  .use(ROUTER.allowedMethods())
  .listen(1992)
```

## 6.Nginx代理

### 6.1 Nginx安装与配置

> [指南](https://www.cnblogs.com/jeffhong99/p/11362361.html)

### 6.2 在Nginx服务器上安装CA证书

> [指南](https://help.aliyun.com/document_detail/98728.html?spm=5176.14113079.help.13.44fd1b4cxjds3h#concept-n45-21x-yfb)

1. 在Nginx安装目录（默认为/usr/local/nginx/conf）下创建一个用于存放证书的目录，将其命名为cert，并存放cert证书key和pem

2. 配置nginx.conf

```bash
# 以下属性中，以ssl开头的属性表示与证书配置有关。
server {
    listen 443 ssl;
    #配置HTTPS的默认访问端口为443。
    #如果未在此处配置HTTPS的默认访问端口，可能会造成Nginx无法启动。
    #如果您使用Nginx 1.15.0及以上版本，请使用listen 443 ssl代替listen 443和ssl on。
    server_name yourdomain; #需要将yourdomain替换成证书绑定的域名。
    root html;
    index index.html index.htm;
    ssl_certificate cert/cert-file-name.pem;  #需要将cert-file-name.pem替换成已上传的证书文件的名称。
    ssl_certificate_key cert/cert-file-name.key; #需要将cert-file-name.key替换成已上传的证书私钥文件的名称。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    #表示使用的加密套件的类型。
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3; #表示使用的TLS协议的类型。
    ssl_prefer_server_ciphers on;
    location / {
        root html;  #Web网站程序存放目录。
        index index.html index.htm;
    }
}

# 设置HTTP请求自动跳转HTTPS
server {
    listen 80;
    server_name yourdomain; #需要将yourdomain替换成证书绑定的域名。
    rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
    location / {
        index index.html index.htm;
    }
}
```

3. 重启Nginx服务

## 7.守护进程

> A simple CLI tool for ensuring that a given script runs continuously (i.e. forever).

> 保持脚本一直运行

模块使用选择：
- pm2
- nodemon
- forever

### 7.1 forever使用

```bash
# 安装
npm install forever -g

# 启动
forever start app.js

# 停止
forever stop app.js

# 守护列表
forever list
```
