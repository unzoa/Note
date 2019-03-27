# creat-react-app

### first
  1, webpack config
   
   在node_modules的react-scripts里面
   实现axios请求数据
    "proxy": {
      "/api": {
        "target": "https://battuta.medunes.net/api/",
        "secure": false,
        "changeOrigin": true,
        "pathRewrite": {
          "^/api": "/"
        }
      }
    }

   2, 配置路由

   |--项目路由
   |--业务路由

   3, flux -> redux

   4, 绝对路径

   5, 打包问题

    |- 图片，css文件问题 ！ 在package.json中一级属性家"homepage": "."
    |- 路由失效问题 ！


  6, App.test.js 是做什么的？

### twice

  1, 语法
  在jsx内js表达式要用{2 + 2}, 也可以是函数{testFunc(params)}, 或者jsx组件表达式<TestFunc src={logo} />
  * 新定义的jsx要用(), 防止‘分号自动插入‘bug

  2, 将组件定义在单独文件
  import React, {component} from 'react'
  class Test extends Component {
    render () {
      return (
        // jsx
      )
    }
  }
  export deafult Test
