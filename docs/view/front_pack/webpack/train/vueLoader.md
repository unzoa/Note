# 接入vue

**Step 1.** 安装
```bash
npm i -D vue

#构建所需的依赖
npm i -D vue-loader css-loader vue-template-compiler
```

说明：
1. vue-loader:解析和转换.vue文件，提取出其中的逻辑代码 script、样式代 码 style及 HTML模板 template，再分别将它们交给对应的 Loader去处理。
2. css-loader:加载由非vue-loader提取出的css代码。
3. vue-template-compiler: 将vue-loader提取出的HTML模板编译成对应的可执行的JavaScript代码

**Step 2.** 配置loader
webpack.config.js

```js
const VueLoaderPlugin = require('vue-loader/lib/')

module: {
  rules: [
    {
      test: /\.vue$/,
      use: ['vue-loader']
    }
  ]
},
plugins: [
  new VueLoaderPlugin()
]
```

**Step 3.** 引入vue文件
```js
//此时就和vue-cli提供的模版main.js一样去引入vue和vue相关文件
import Vue from 'vue'
import App from './app.vue'
new Vue({
    el: '#app',
    render: h => h(App)
})
```
