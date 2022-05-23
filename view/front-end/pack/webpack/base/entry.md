# 入口entry

> webpack 采用模块化思想，搜有文件和配置都是一个个模块，同时联系在一起。可以简单的理解为一颗树状结构，那么对开始就是一个根（入口文件）entry
webpack在执行构建的时候
1.找到入口文件
2.根据入口开始，寻找、遍历、递归解析出所有入口依赖的模块

```js
module.export = {
  entry: {
    app: './src/main.js'
  },
  // 还有output，module等其他配置
}
```

- **静态entry**

类型|例子|含义
:---|:---|:--
string | './app/entry'| 可以是相对路径
array | ['./app/entry', './app/entry2'] | <span style="color:red;">?</span>
object | {a: './app/entryA', b: './app/entryA'} | 配置对歌入口，每个入口都生成一个chunk

- **动态entry**

```js
// 同步函数
entry () {
  return {
    a: '',
    b: ''
  }
}

// 异步函数
entry () => {
  return new Promise(resolve => {
    resolve({
      a: '',
      b: ''
    })
  })
}
```
