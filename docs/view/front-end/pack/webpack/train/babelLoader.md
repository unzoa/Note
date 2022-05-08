# 接入Babel

### 1. 认识babel
> babel是一个js解释器，可以将es6转化为es5;
可以通过插件机制扩展

在babel执行编译过程中，会读取根下 .babelrc的配置
```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2",
    "react"
  ],
  "plugins": [
    "transform-vue-jsx",
    "transform-runtime"
  ]
}
```

- presets: 告诉babel要转换哪些特性，例如‘react’
- plugins: 告诉babel利用哪些插件去转换

### 2. 接入Babel

- webpack.config.js
```js
modules: [
  {
    rules: /\.js$/,
    use: ['babel-loader']
  }
]
```

- 创建 .babelrc
```json
{
  "presets": ["env"],
  "plugins": []
}
```

- 安装插件
```bash
# webpack接入babel必需模块
npm i -D babel-core babel-loader

# 根据需求，安装不同的presets 或者 plugins
npm i -D babel-preset-env
```


