# Docsify

> [基本使用](https://docsify.js.org/#/zh-cn/quickstart)

1. 全局安装docsify

```bash
npm i docsify-cli -g
```

2. 初始化项目

```bash
docsify init ./docs
```

初始化成功后，可以看到 ./docs 目录下创建的几个文件

```
+-- index.html 入口文件
+-- README.md 会做为主页内容渲染
+-- .nojekyll 用于阻止 GitHub Pages 会忽略掉下划线开头的文件
```

直接编辑 docs/README.md 就能更新网站内容，当然也可以写多个页面。

3. 本地预览

运行一个本地服务器，通过 docsify serve 可以方便的预览效果，而且提供 LiveReload 功能，可以实时的预览。默认通过 http://localhost:3000 访问。
