# 读取文件

> 使用node读取 指定路径/文件名

```js
var fs = require('fs')
function nodeReadFile (path, cb) {
  fs.readFile(path, 'utf8', cb)
}
```
