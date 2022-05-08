# 检查 js & css

### 检查 JavaScript
**ESLint** 最常用的 JavaScript 检查工具是 ESlint (eslint.org)，它不仅内置了大量的常用检查规则，还可以通过插件机制做到灵活扩展。

**Step 1.**
- 安装

```bash
npm i eslint --save-dev
```

- 创建.eslintrc

```json
{
  //从 eslint :recommended 中继承所有检查规则
  "extends" : "eslint:recommended",
  // 再自定义一些规则
  ”rules”:{
    //需要在每行结尾加 ;
    "semi":["error"，"always"] , //需要使用""包裹字符串
    "quotes" : [ "error", "double"]
    }
}
```

- 运行命令
```bash
// 检查fileName.js文件中存在的错误
eslint fileName.js
```

**Step 2.** webpack配置
- 安装
```bash
npm i -D eslint-loader
```

- 添加loader
```js
module: {
  rules: [
    {
      test: /\.js$/,
      use: [
        {
          loader:'eslint-loader',
          options: {
            formatter: require('eslint-frinedly-formatter') // 默认的错误提示
          },
          enforce: 'pre', // 编译前检查
          exclude: 'node_modules',
          include: [__dirname + '/src']
        }
      ]
    }
  ]
}
```


### 检查 CSS
> [stylelint](stylelint.io)是目前最成熟的 css 检查工具，在内置了大量检查规则的 同时，也提供了插件机制让用户自定义扩展 。 stylelint 基于 PostCSS，能检查任何 PostCSS 能解析的代码，例如 scss、 Less 等 。

- 安装
```bash
npm i -D stylelint
```

- 创建.stylelintrc文件
```json
{
  //继承 stylelint-config-standard 中所有的检查规则
  "extends":"stylelint-config-standard",
  // 再自定义检查规则
  "rules": {
    "at-rule-empty-line-before": null
  }
}
```

- 执行命令
```bash
styleLint 'filename.css'
```


