# 请求的应用

#### axios
```
  npm install axios --save-dev
```

#### api.js
> 导出一个json对象

```js
export default {
  'login': 'login/', // 登陆接口 post
  'gene_analysis': 'api/uploadsample/' // 文件上传
}
```

### axios请求
```js
import Axios from 'axios'

export default {
  get (Interface, requestData = {}) {
    return new Promise(resolve => {
      Axios.get(Interface, {
        params: requestData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          resolve(res)
        }).catch(res => {
          resolve(res)
        })
    })
  },

  blob (Interface, requestData = {}) {
    let configOri = {
      params: requestData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      responseType: 'blob'
    }
    return new Promise(resolve => {
      Axios.get(Interface, configOri)
        .then(r => {
          resolve(window.URL.createObjectURL(new Blob([r])))
        }).catch(res => {
          resolve(res)
        })
    })
  },

  post (Interface, requestData = {}) {
    return new Promise(resolve => {
      Axios.post(Interface, requestData, {
        transformRequest: [function (requestData) { // 转换数据格式，有待测试传送文件的方式时候同样可行。
          let ret = ''
          for (let it in requestData) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(requestData[it]) + '&'
          }
          ret = ret.slice(0, ret.length - 1)
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then(res => {
          resolve(res)
        }).catch(res => {
          resolve(res)
        })
    })
  },

  upload (Interface, formData, config) {
    return new Promise(resolve => {
      Axios.post(Interface, formData, config)
        .then(res => {
          resolve(res)
        }).catch(res => {
          resolve(res)
        })
    })
  }
}
```

### axios拦截
```js
import Axios from 'axios'
import api from '@/config/common/api.js'
import router from '@/config/common/router'

function TOKEN () {
  return localStorage['token']
}

Axios.interceptors.request.use( // 请求拦截器-------------
  config => {
    let mock = false

    if (config.method === 'post') {
      if (Object.prototype.toString.call(config.data) === '[object FormData]') {
        config.data.append('token', TOKEN())
      } else {
        config.data.token = TOKEN()
      }

      !config.data.mock || (mock = true)
    } else if (config.method === 'get') {
      config.params = {
        ...config.params,
        token: TOKEN()
      }
      !config.params.mock || (mock = true)
    }

    // 判断mockjs拦截
    mock || (config.url = api[config.url])

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

Axios.interceptors.response.use( // 响应拦截器---------------
  response => {
    let data = response.data || response

    if (typeof data === 'string' && response.headers['content-disposition']) { // 判断是流文件
      // 获取流文件的名称
      let streamFileName = response.headers['content-disposition'].split(';')[1].split('=')[1].replace(/"/g, '')
      localStorage.setItem('streamFileName', streamFileName)
    }

    // 401 跳转到login
    if (data.status === 401) {
      // 清理信息存储
      ...

      router.push({path: '/Login'}).catch(err => (err))
    }

    return data
  },
  error => {
    return Promise.reject(error)
  }
)
```

#### 跨域
> config/index.js配置dev:

```js
{
  ...
  proxyTable:{
    '/api': {
      target: 'http://192.168.1.26',
      changeOrigin: true
    },
    '/user': {
      target: 'http://192.168.1.26',
      changeOrigin: true
    }
  }
  ...
}
```

#### vue-resource
```
  npm install vue-resource --save-dev
```

```js
  // main.js
  import VueResource from 'vue-resource'
  Vue.use(VueResource)
  Vue.http.options.emulateJSON = true;

  // use in component
  this.$http.post(url,{}).then((res)=>{})
```