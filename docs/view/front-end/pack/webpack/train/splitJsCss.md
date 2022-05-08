# javascript与css处理

### 1. 分离javascript与css
> 打包entry入口文件的时候，文件中所依赖的css等样式模块也会包含js中.

**目标**：分离javascript和css，分别存放在不同的文件中。


**Step 1.** 安装依赖
Webpack 4.x已经不再支持extract-text-webpack-plugin，推荐使用mini-css-webpack-plugin， 如果想继续使用该插件，请 [参考该文档](https://blog.csdn.net/qq_38526769/article/details/82427800)

此处，我们依然用该插件来实现js与css的代码分离：
```bash
npm i extract-text-webpack-plugin@next --save-dev
```
**注意：** 后面的@next必须加上，webpack4.x只支持该版本
或者可以用一个新插件： mini-css-extract-plugin


**Step 2.** 增加webpack配置

webpack.config.js
```js
const ExtractTextPlugin = require ('extract-text-webpack-plugin')

module.exports = {
  module:{
    rules:[
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: path.resolve(__dirname, '/style/bundle.css') //注意可以指定分离出来的css文件的指定目录
    })
  ]
};
```

### 2. 压缩css

**Step 1.** 安装依赖
```bash
npm i optimize-css-assets-webpack-plugin --save-dev
```

**Step 2.** 添加配置
```js
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.export = {
  plugins: [
    //只要配置了该插件，即可对分离出来的css进行压缩
    new OptimizeCssAssetsPlugin()
  ]
}
```

### 3. 压缩javascript
> 很多教程使用的是UglifyJsPlugin，不过是webpack4.x之前的版本可以使用，webpack4.x已经不支持使用，移除webpack.optimize.UglifyJsPlugin 压缩配置了, 推荐使用 optimization.minimize 属性替代。

```js
module.exports = {
  optimization: {
    minimize: true // webpack内置属性，默认为true，build之后的js文件压缩
  }
}
```

### 4. 提取公共javascript
**问题** 如果每个页面的代码都将这些公共的部分包含进去，则会造成以下问题：
1. 相同的资源被重复加载，浪费用户的流量和服务器的成本。
2. 每个页面需要加载的资源太大，导致网页首屏加载缓慢， 影响用户体验。

**开发需求** 一些公共的工具函数所在的common.js文件，这个公共文件中的工具函数会被多个页面同时使用，其实，还有一个base.js也就是最基础的文件，例如，我们vue开发过程中的vue.js

所以，此处所说的公共文件包含以下两部分：
1. common.js （手动创建）每次都可能更新
2. base.js （引入的第三方依赖：如vue.js，lodash，jquery等），基本不会动基本库

**webpack提取** webpack4.x提取公共代码推荐使用：webpack内置的SplitChunksPlugin插件，4.x之前所使用的CommomsChunksPlugin已被淘汰

实例演示：

**Step 1.** 我们创建了两个入口文件：main.js 和 index.js， 还有一个公共的common.js文件，同时再安装一个lodash第三方库，然后两个入口文件中，分别引入common.js和lodash;
```js
// mian.js和index.js
import './assets/js/common';
import 'lodash';
```

**Step 2.** 配置多入口文件
```js
module.export = {
  entry: {
    main: './src/main.js',
    index: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: "initial",
      minSize: 0 // webpack 默认30000 3k的文件分离
    }
  }
}
```
