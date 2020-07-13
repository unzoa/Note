# plugin

> plugins 包含很多webpcak自己的插件，也有其他开源的插件，致力于解决loader之外的相关构建的事
plugins 是一个数组，可以传入多个插件

```js
const CommonsChunkPplugin = require('webpack/lib/optimize/CommonsChunk{lugin')

modules: {
  plugins: [
    new CommonsChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    }),

    // 也可以配置其他插件
  ]
}
```