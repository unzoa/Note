** 全局环境中安装Webpack和webpack-dev-server **

- npm i -g webpack webpack-dev-server

** 安装相关依赖 **

- npm install

** 运行目录下的资源文件 **

- webpack-dev-server

** 命令行选项 **

- webpack– for building once for development(用于构建一个开发目录)
- webpack -p– for building once for development(用于构建一个生产目录(压缩过的))
- webpack --watch– for continuous incremental build(用于连续地构建)
- webpack -d– to include source maps(展示映射关系)
- webpack --colors– for making things pretty(用于美化展示的信息)

** 教程开始**

# Entry file(入口文件)

Webpack follows `webpack.config.js` to build `bundle.js`.

```javascript
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  }
};
```

# Multiple(多个入口文件)

```javascript
module.exports = {
  entry: {
    bundle1: './main1.js',
    bundle2: './main2.js'
  },
  output: {
    filename: '[name].js'
  }
};
```

# loader，Babel-loader(编译器可以将es6语法转成低版本[如es5语法]提高兼容性)

- loaders(加载器)是可以转换您的应用程序资源(更多信息)文件的一个预处理器

```javascript
module: {
  loaders: [
    	{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
			presets: ['es2015', 'react']
			}
		},
		{ 
			test: /\.css$/, 
			loader: 'style-loader!css-loader'
			//css-loader read css,style-loader insert css tag into html 

			// loader: 'style-loader!css-loader?modules'
			// :global(.h2){}设置全局样式
			// .h1{}设置私有样式
		},
		{ 
			test: /\.(png|jpg)$/, 
			loader: 'url-loader?limit=8192' 
			
			// urll-loader transforms image files,if img size>8192,it'll be transformed insto Data Url;ortherwise , its a normal url
		}
  ]
}
```

# HTML Webpack Plugin and Open Browser Webpack Plugin,3rd plugin

```javascript
var HtmlwebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Webpack-demos',
      filename: 'index.html'
    }),
    new OpenBrowserPlugin({
      url: 'http://localhost:8080'
    })
  ]
};
```

- Now you don't need to write `index.html` by hand and don't have to open browser by yourself. Webpack did all these things for you.

# Code splitting

* 1.require.ensure
	
	- require.ensure to define a split point
	- require.ensure tells Webpack that ./a.js should be separated from bundle.js and built into a single chunk file.
	- a.js -- module.exports = 'Hello World';

* 2.bundle-loader

	- require('bundle-loader!./a.js') tells Webpack to load a.js from another chunk.

# Common chunk:demo12

```javascript
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
module.exports = {
  entry: {
    bundle1: './main1.jsx',
    bundle2: './main2.jsx'
  },
  output: {
    filename: '[name].js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
    ]
  },
  plugins: [
    new CommonsChunkPlugin('init.js')
  ]
}
```

# Vendor chunk:demo13

* 1,main.js中使用jquery

```javascript
	var webpack = require('webpack');

	module.exports = {
	  entry: {
	    app: './main.js',
	    vendor: ['jquery'],
	  },
	  output: {
	    filename: 'bundle.js'
	  },
	  plugins: [
	    new webpack.optimize.CommonsChunkPlugin(/* chunkName= */'vendor', /* filename= */'vendor.js')
	  ]
	};
```

* 2,If you want a module available as variable in every module, such as making $ and jQuery available in every module without writing require("jquery"). You should use ProvidePlugin

```javascript
	// main.js
	$('h1').text('Hello World');


	// webpack.config.js
	var webpack = require('webpack');

	module.exports = {
	  entry: {
	    app: './main.js'
	  },
	  output: {
	    filename: 'bundle.js'
	  },
	  plugins: [
	    new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery"
	    })
	  ]
	};
```

# Exposing global variables

- If you want to use some global variables, and don't want to include them in the Webpack bundle, you can enable externals field in webpack.config.js

- For example, we have a data.js.

```javascript
	// data.js
	var data = 'Hello World';

	// webapck.config
	externals: {
	    // require("jquery") is external and available
	    //  on the global var jQuery
	    //  "jquery": "jQuery"
	    'data': 'data'
	}

	// main.jsx
	var data = require('data');
```

# Hot Module Replacement:demo15

* 1,webpack-dev-server --hot --inline

- hot: adds the HotModuleReplacementPlugin and switch the server to hot mode.
- inline: embed the webpack-dev-server runtime into the bundle.
- hot --inline: also adds the webpack/hot/dev-server entry.

* 2,Modify webpack.config.js.

- add new webpack.HotModuleReplacementPlugin() to the plugins field
- add webpack/hot/dev-server and webpack-dev-server/client?http://localhost:8080 to the entry field

```javascript
	var webpack = require('webpack');
	var path = require('path');

	module.exports = {
	  entry: [
	    'webpack/hot/dev-server',
	    'webpack-dev-server/client?http://localhost:8080',
	    './index.js'
	  ],
	  output: {
	    filename: 'bundle.js',
	    publicPath: '/static/'
	  },
	  plugins: [
	    new webpack.HotModuleReplacementPlugin()
	  ],
	  module: {
	    loaders: [{
	      test: /\.jsx?$/,
	      exclude: /node_modules/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015', 'react']
	      },
	      include: path.join(__dirname, '.')
	    }]
	  }
	};
```
