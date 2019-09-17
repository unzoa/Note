# Vue
> [学习](https://www.cnblogs.com/huangfeihong/p/9141273.html)

#### img
- template ../../static/

- js 
无脑的可以直接 import 进来

- css ../../static/
utils.js
```js
exports.cssLoaders = function (options) {
	if (options.extract) {
		return ExtractTextPlugin.extract({
		use: loaders,
		fallback: 'vue-style-loader',
		publicPath: '../../' // 这里增加打包路径
		})
	}
}
```

- 打包后控制img显示问题
webpack.base.js 
img
limit:100000 B
当size一定大时候，范围内的image都会变成base64，即使是css引入的

#### 引入第三方
- globe import, in main.js
- or import in component
```js
import './assets/animate.css'
```

#### jquery bootstrap.js
```
npm install jquery —-save-dev
```
- 更改webpack.base.conf.js
```js
var webpack = require ('webpack') 
<!-- resolve 'jquery': 'jquery' -->
plugins:[
	new webpack.optimize.CommonsChunkPlugin('common.js'),
	new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery'})
]
```
    
- 然后就可以在main.js中引入boostrap和jquery了
```js
import $ from 'jquery' 
import './assets/bootstrap/js/bootstrap.min.js'
import ‘./assets/bootstrap/css/bootstrap.css'
```