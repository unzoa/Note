# nsfwjs

> 一个可以鉴别黄图的工具，依赖@tensorflow/tfjs-node

## 安装

### macos

```bash
npm i nsfwjs -D
npm i @tensorflow/tfjs-node -D
```

### linux

```bash
npm i nsfwjs -D
```

**安装@tensorflow/tfjs-node会报一些找不到包的错误**

[查看版本](https://storage.googleapis.com/tf-builds/)

```xml
<Contents>
  <Key>
  pre-built-binary/napi-v7/3.10.0/CPU-linux-3.10.0.tar.gz
  </Key>
  <Generation>1634867341953166</Generation>
  <MetaGeneration>1</MetaGeneration>
  <LastModified>2021-10-22T01:49:02.087Z</LastModified>
  <ETag>"9f69cb502e2a600cd7ecc30c74de2862"</ETag>
  <Size>31673</Size>
</Contents>
```

```bash
# 其中key的napi-v7和node版本有匹配
# 切换node v14.21.3
# 安装3.10.0

npm i @tensorflow/tfjs-node@3.10.0 --registry https://registry.npmmirror.com --save-exact
```

## 使用

### nodejs

```js

const tf = require('@tensorflow/tfjs-node')
const nsfw = require('nsfwjs')
let model = ''

async function nsfwLoad () {
  // To load a local model, nsfw.load('file://./path/to/model/')
  model = await nsfw.load()
}

async function nsfwCheck (imgBuffer) {
  // Image must be in tf.tensor3d format
  // you can convert image to tf.tensor3d with tf.node.decodeImage(Uint8Array,channels)
  const image = await tf.node.decodeImage(imgBuffer, 3)
  const predictions = await model.classify(image)
  // Tensor memory must be managed explicitly
  // (it is not sufficient to let a tf.Tensor go out of scope for its memory to be released).
  image.dispose()

  return predictions[0].className === 'Porn'
}

module.exports = {
  nsfwLoad,
  nsfwCheck
}
```