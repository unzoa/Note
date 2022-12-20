# 七牛云使用

步骤：
1. 获取url的图片流
2. 压缩但不降低画质
3. 上传至七牛
  - 准备工作
  - 使用SDK
  - 问题

---

## 1. 图片下载与压缩

```bash
# 压缩
npm i @mxsir/image-tiny-node@0.0.2 -D
```

注意：
1. 下载url文件流，可能出错，需要捕获
2. 压缩文件流，可能出错，需要捕获

---

## 2. 上传至七牛

### 准备工作

[官方上传下载操作指南](https://developer.qiniu.com/kodo/kb/1336/upload-download-instructions)

1. 注册账号
2. 创建空间（Bucket），根据情况设置为公开或私有
3. 绑定域名


### 使用SDK

[Node.js SDK](https://developer.qiniu.com/kodo/sdk/nodejs#1)
```bash
npm i qiniu -D
```

```js
const qiniu = require('qiniu')
const conf = require('../../../config/qiniu') // ak,sk,bucket

const putPolicy = new qiniu.rs.PutPolicy({
  scope: conf.BUCKET,
  // 上传成功后返回数据键值对参数设置
  returnBody: '{"key": "$(key)", "hash": "$(etag)", "size": $(fsize), "bucket": "$(bucket)", "mimeType": "$(mimeType)"}'
})

/**
 * 获取上传凭证
 */
 function updateToken () {
  const mac = new qiniu.auth.digest.Mac(conf.AK, conf.SK)
  return putPolicy.uploadToken(mac)
}

const config = new qiniu.conf.Config({
  // zone: qiniu.zone.Zone_z0, // 对应的机房,unzoa-weibo  是华南
  useHttpsDomain: true, // 是否使用https域名
  useCdnDomain: true, // 上传是否使用cdn加速
})
const formUploader = new qiniu.form_up.FormUploader(config) //  生成表单上传的类
const putExtra = new qiniu.form_up.PutExtra() //  生成表单提交额外参数

async function upload (fileName, fileStream) {
  return new Promise((resolve, reject) => {
    formUploader.putStream(
      updateToken(),
      fileName,
      fileStream,
      putExtra,
      function (respErr, respBody, respInfo) {
        if (respErr) {
          console.log('Qiniu error: ', respErr)
          // reject(respErr)
          resolve(respErr)
        }
        if (respInfo && respInfo.statusCode == 200) {
          resolve(respBody)
        } else {
          // reject(respBody)
          console.log('Qiniu else: ', respBody)
          resolve(respBody)
        }
      }
    )
  })
}

module.exports = upload
```

### 问题

1. 回调报错
- file exits
- timeout 5000ms