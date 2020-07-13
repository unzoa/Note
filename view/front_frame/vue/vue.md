# Vue
> [学习](https://www.cnblogs.com/huangfeihong/p/9141273.html)

#### img引入问题
> **如果是图标，应用iconfont实现**

- template、script、css
> 国旗和大的图片存在于static，小的图片使用import引入
```
/static/
```

- 打包后控制img显示问题 webpack.base.js
```js
  {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000, // B,当size低于这个值，图片都会变成base64，即使是css引入的
      name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
  }
```

- 图片太大
> 放置static中；**使用压缩后的图片[压缩网站](https://tinypng.com)**


#### 引入无法npm安装的第三方插件
> 需要在index.html中根节点之后，script标签引入

e.g.
```
<script src="./static/d3Graphviz/d3.js"></script>
<script src="./static/d3Graphviz/viz.js" type="javascript/worker"></script>
<script src="./static/d3Graphviz/d3-graphviz.js"></script>
```
