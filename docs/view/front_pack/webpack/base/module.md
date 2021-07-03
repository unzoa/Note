# module

> 用于配置处理模块的规则：
  1.配置loader
  2.配置noParse
  3.配置parse


1. 配置loader

- use:
多个loader时，执行顺序是 （左<=右）
['style-loader', 'css-loader', 'sass-loader']执行'sass-loader' => 'css-loader' => 'style-loader'

- enforce:
可以用enforce强制某个loader的执行在最前面(post)还是最后面(pre)

- cacheDirectory:
传给babel-loader参数，用于缓存babel的编译结果，加快编译的速度

```js
module: {
  rules: [
    {
      test: /\.js$/,
      inlude: path.resolve(__dirname, 'src'),

      // use 可以是普通字符串数组，也可以是对象数组
      use: ['babel-loader?cacheDirectory'],
      use: [
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
          enforce: 'post'
        }
      ]
    },

    {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      exclude: path.resolve(__dirname, 'node_modules')
    },

    {
      // 对非文件文件采用file-loader 加载
      test: /\ . (gif Ipng Ijpe?g Ieot Iwoff Ittf Isvg Ipdf) $)/,
      use: ['file-loader']
    },

    // 配置更多的loader
  ]
}
```

2. 配置noParse
noParse 让webpack忽略不采用的模块化的文件，不进行编译处理，例如：JQuery没有采用模块化标注，webpack解析耗时无意义

```js
module: {
  rules: [],

  noParse: /jquery|lodash/,
  noParse: content => {
    return /jquery/.test(content)
  }
}
```
**注意**
被忽略文件不应包含 import、require、define 等模块化语句，不然会导致在构建出代码中包含无法在浏览器环境下执行模块化语句


3. 配置parse

webpack以模块化的js文件为入口，所以内置了对模块化js的解析，支持AMO，CommonJS, SystemJS, ES6。parse属性可以更细粒度配置哪些模块需要解析。
同noParse配置项区别于，parse可以精确到语法层面，noParse只能控制哪些文件不被解析。

```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: ['babel-loader'],
      parse: [
        amd; false, // 禁用AMD
        commonjs: false,
        system: false,
        harmony: false
      ]
    }
  ]
}
```

**注意**
> parse和noParse是同级属性，可以嵌套到rules，表示针对某个loader应用该属性。
