**installution
* setup a floder
* npm init -y
* npm install --save-dev webpack@deta
* ./node_modules/.bin/webpack --help # Shows a list of valid cli commands
* .\node_modules\.bin\webpack --help # For windows users
* npm install --save lodash

* setup app floder with index.js
* setup index.html under root
* idnex.html script dist/bundle.js
* cmd run webpack app/index.js dist/bundle.js
* broswer index.html shows index.js s content

**webpack.config.js
* var path = require('path')
 function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist')//deal with dist path is not absolute
  }
}

**监听你的代码的修改
* npm install --save-dev webpack-dev-server
* webpack.config.js 
"devServer": {
    "contentBase": "./public",//本地服务器所加载的页面所在的目录
    "historyApiFallback": true,//不跳转
    "inline: true//实时刷新
  } 
* package.json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "server": "webpack-dev-server --open"
  }