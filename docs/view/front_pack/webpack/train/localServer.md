# 搭建本地环境

## 1. 搭建本地开发环境webpack-dev-server

```bash
npm i -D webpack-dev-server
```

## 2. 配置package.json

```json
scripts: {
  "dev": "webpack-dev-server --inline --progress --config webpack.dev.config.js"
}
```

说明：此处我们新建一个测试环境的webpack配置文件，用于区分正式环境和测试环境

## 3. 配置devServer

```js
const {merge}  = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.js')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    port: 9090,
    contentBase: './dist'
  },
  plugins: []
})
```

- 实时刷新

> 刷新整个页面

```js
devServer: {
  inline: true // 实时刷新
}
```

- 热更新

> 刷新部分页面

```js
devServer: {
  hot: true // 热替换
},
plugins; [
  new webpack.HotModuleReplacementPlugin()
]
```
