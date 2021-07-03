# 接入scss

> scss 即为了我们书写css更方便且更有效率，出现了less，sass，scss等css的预处理器，那么，在最后部署上线的时候，依然要转成css，才可以在浏览器端运行。

**Step 1.** 安装依赖

```bash
# webpack loader
npm i -D scss-loader css-loader style-loader

# sass-loader 依赖 node-sass
npm i -D node-sass
```

**Step 2.** 在modules中配置

```js
module: {
  rules: [
    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'scss-loader']
    }
  ]
}
```

说明:
1. 当有多个loader的时候，编译顺序是从后往前
2. sass-loader: 首先通过sass-loader将scss代码转换成css代码，再交给css-loader处理
3. css-loader 会找出 css 代码中 import 和 url ()这样的导入语句，告诉 Webpack 依赖这些资源 。 同时支持 CSS Modules、压缩 css 等功能 。处理完后再将结果交给 style-loader处理。
4. style-loader会将 css代码转换成字符串后，注入 JavaScript代码中，通过 JavaScript 向 DOM 增加样式。

以上是配置wepbakc接入scss的基本配置， 除此之外，我们还可以加入优化配置：

1. 压缩css
2. css与js代码分离：ExtractTextPlugin

