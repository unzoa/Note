# webpack-es6-simple

**prepare to change github to git commond**

* npm init -y 
* npm install webpack -g


```bash
**webpack.config.js**
var path = require('path');
module.exports = {
  entry: "./app/main.js",
  output: {
    path: __dirname,
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: path.join(__dirname, 'app'),
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
}
```

* npm install babel-core --save-dev
* npm install babel-loader --save-dev
* npm install babel-preset-es2015 --save-dev

```bash
**index.html**
<script src="bundle.js"></script>
```

* npm install node-sass
* npm install style-loader css-loader --save-dev
* npm insatll sass-loader --save-dev

```bash
**webpack.config.js loaders adds**
* {test: /\.css$/, loader: "style-loader!css-loader"},
* {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"}
**main.js**
* import "!style-loader!css-loader!sass-loader!./style/*.scss"
```

* webpack --progress --colors --watch

* test github contributions change green
* again