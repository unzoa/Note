# 打包

#### 打包app.js vendor文件过大问题解决方案
> 针对vue-cli2

- Step 1. **webpack.prod.conf.js**
```js
  new HtmlWebpackPlugin({
    ...
    isProduction: process.env.NODE_ENV === 'production' // index.html判断条件，是否加入external的模块
  })
```

- Step 2. **index.html**
```html
  <!-- <% if (htmlWebpackPlugin.options.isProduction) { %> -->
    <script src="/static/vendor/vue.min.js"></script>
    <script src="/static/vendor/vue-router.min.js"></script>
    <script src="/static/vendor/vuex.min.js"></script>
    <link rel="stylesheet" href="/static/vendor/element-ui/theme-chalk/index.css" >
    <script src="/static/vendor/element-ui/index.js"></script>
  <!-- <% } %> -->
```

- Step 3. **webpack.base.conf.js**
```js
  // 区分开发和打包模式
  let externals = {}
  if (process.env.NODE_ENV === 'production') {
    externals = {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'vuex': 'Vuex',
      'element-ui': 'ELEMENT',
    }
  }

  module.exports = {
    ...
    externals: externals,
    ...
  }
```

- Step 4. 修改element-ui的样式
```js
  if (process.env.NODE_ENV !== 'production') { // 打包时候不引入，利用index.html下elementui
    require('element-ui/lib/theme-chalk/index.css')
  }
```
