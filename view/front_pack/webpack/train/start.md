# 入门配置

1. 全局安装
```bash
npm i -g webpack webpack-cli
```

2. 项目安装
```bash
npm init
npm i -D webpack
```

3. 创建目录
```bash
|- src
|-|- main.js
|- package.json
|- webpack.config.js
```

webpack.config.js
```js
const path = require('path')

module.export = {
  entry: './src/main.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```
