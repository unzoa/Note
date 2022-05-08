# 单页面应用

### 1. 认识单页面应用
通过入口文件main.js打包成bundle.js，入口文件也是必然要引用在html文件中。
如何创建html文件？怎么创建build以后的html文件？以及html文件如何引入js文件？

[html-webpack-plugin](https://www.webpackjs.com/plugins/html-webpack-plugin/)

实现功能:
1.不用手动创建html文件，build之后自动生成一个index.html
2.生成的index.html不需要手动引入js文件，会自动创建script标签，并引入生成的bundle.js

### 2. 创建单页面应用

**Step 1.** 安装插件
```bash
npm i html-webpack-plugin -D
```

**Step 2.** 配置插件
```js
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html', // 编译后生成的html文件名称
    template: './index.html' // 以哪个文件作为模版，在dist下生成新的html文件
  })
]
```
