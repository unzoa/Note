# api应用

#### vue-resource
    npm install vue-resource --save-dev
    # main.js 
        import VueResource from 'vue-resource'
        Vue.use(VueResource) 
        Vue.http.options.emulateJSON = true;
    # use
        in component 
            this.$http.post(url,{}).then((res)=>{})

#### axios
    npm install axios --save-dev
    # main.js or component
     import axios from 'axios'

#### api
    import axios from 'axios'
    
    // 命名接口
    const apiPath = ''
    const apiArr = {
      'login': 'login/', // 登陆接口 post
      'gene_analysis': 'api/uploadsample/' // 文件上传
    }
    
    // 添加请求拦截器
    axios.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error)
    })
    
    // 添加响应拦截器
    axios.interceptors.response.use(
      (response) => {
        return response.data
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    
    const api = {}
    
    api.post = (Interface, requestData) => {
      return axios.post(apiPath + apiArr[Interface], requestData, {
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
        },
        timeout: 3000
      })
    }
    
    api.get = (Interface, requestData) => {
      return axios.get(apiPath + apiArr[Interface], {
        params: requestData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 3000
      })
    }
    
    api.upload = (Interface, formData, config) => {
      return new Promise((resolve, reject) => {
        axios.post(apiPath + apiArr[Interface], formData, config).then((res) => {
          if (res) {
            resolve(res)
          }
        }).catch((res) => {
          resolve(res)
        })
      })
    }
    
    export default api


#### use
    import api from '@api/api.js'
    
    api.post(apiUrl, {openid:'oK-O_t0mp3Br9HoYOFycp3_P1Hi4'}).then((res)=>{
        console.log(res)
    })
    
    //upload imgae
    <input type="file" name="" id="" value="" @change="upLoadImg">
    upLoadImg(e){
        api.upload(url,e.target.files[0],{type:11,deviceId:api._deviceId})
    }   

#### 跨域
    # config/index.js配置dev:
    {
        proxyTable:{
            '/api':{ 
                target: 'http://192.168.1.26',
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/api' // key is webfront set, value is webback set.
                }
            }
        }
    }
