# Proxy
- PlanA: edit package.json
```json
  "proxy": "protocol://domain:port/",
```

- PlanB: 根目录下创建setupProxy.js
> npm install http-proxy-middleware

  ```js
    const { createProxyMiddleware } = require('http-proxy-middleware')

    module.exports = function (app) {
      app.use(createProxyMiddleware(
        '/user', {
          target: 'http://192.168.1.99/',
          changeOrigin: true,
          pathRewrite: {
            '^/': ''
          }
        }
      ))

      app.use(createProxyMiddleware(
        '/api', {
          target: 'http://192.168.1.99/',
          changeOrigin: true,
          pathRewrite: {
            '^/': ''
          }
        }
      ))
    }
  ```
+ 应用
```js
  ajax.post('/user/login/', {})
  ajax.get('/api/home_data/', {})
```
