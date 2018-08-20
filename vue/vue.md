# Vue

### Build Setup
    # install dependencies
    npm install

    # serve with hot reload at localhost:8080
    npm run dev

    # build for production with minification
    npm run build

    # build for production and view the bundle analyzer report
    npm run build --report

#### img
    # template ../../static/
    
    # js 
    
    # css ../../static/
    utils.js
    exports.cssLoaders = function (options) {
        if (options.extract) {
          return ExtractTextPlugin.extract({
            use: loaders,
            fallback: 'vue-style-loader',
            publicPath: '../../' // 这里增加打包路径
          })
        }
    }

    # 打包后控制img显示问题
    webpack.base.js 
    img
    limit:100000 B
    当size一定大时候，范围内的image都会变成base64，即使是css引入的

#### vue-resource
    npm install vue-resource --save-dev
    # main.js 
		import VueResource from 'vue-resource'
		Vue.use(VueResource) 
		Vue.http.options.emulateJSON = true;
    # use
		in component 
			this.$http.post(url,{}).then((res)=>{})

### 拓展  

#### /api/api.js
    import Vue from 'vue' // 将用于调用接口
    import Router from '../router' // 在api.js中哟用router

	const baseurl = 'http://www.fitmee.cn/wx/Home/Interface/myself'
	const api={}

	api.post = (requestData)=>{
		return new Promise((reslove,reject)=>{
			Vue.http.post(baseurl,requestData).then(function(res){
				reslove(res)
			})
		})
	}
        
    // 图片上传
    api.upload = (Interface,file,_obj) => {
        let formData = new FormData()
        formData.append('attach', file)
        for (var k in _obj) {
          formData.append(k, _obj[k])
        }
        return new Promise((resolve, reject) => {
          Vue.http.post(api.apiPath+apiArr[Interface], formData)
          .then(function (response) {
            resolve(response.body)
          })
        })
    }
    export default api

    # use  
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

#### 引入第三方
    # globe import, in main.js
    # or import in component
    import './assets/animate.css'

#### jquery bootstrap.js
    npm install jquery —-save-dev
    # 更改webpack.base.conf.js
        var webpack = require ('webpack') 
        <!-- resolve 'jquery': 'jquery' -->
        plugins:[
            new webpack.optimize.CommonsChunkPlugin('common.js'),
            new webpack.ProvidePlugin({jQuery: 'jquery', $: 'jquery'})
        ]

    # 然后就可以在main.js中引入boostrap和jquery了
        import $ from 'jquery' 
        import './assets/bootstrap/js/bootstrap.min.js'
        import ‘./assets/bootstrap/css/bootstrap.css'

#### Swiper的使用
    # npm install vue-awesome-swiper —-save-dev
    # 引入vue-awesome-swiper
    main.js.  
    import VueAwesomeSwiper from ‘vue-awesome-swiper'  
    Vue.use(VueAwesomeSwiper)
    
    # template
    <swiper :options="swiperOption" ref=“mySwiper">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <!-- Optional controls -->
    <div class="swiper-pagination"  slot="pagination"></div>
    
    # script
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    data(){}
    swiperOption: {}
    components: {swiper, swiperSlide}
    computed: {swiper() { return this.$refs.mySwiper.swiper } }

    # slidesPerView控制多个slide同框宽度为body宽度平均