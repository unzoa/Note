# long

> tanglangquan

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


vue - long

**实现**
* 1,路由
* 2,弹窗组件
* 3,侧滑菜单

**Problem**

*1,弹窗组建使用:直接在home内引入

	* 1.1，使用组件
		<modalClass class="modalClass" v-if=“modalClassShow”></modalClass>
		注册：
	  
	* 1.2, 显示组件
		this.modalClassShow = !this.modalClassShow;
	  
	* 1.3, 父组件静止，子组件内scroll
		:class="{homefixed:ishomefixed}"
		.homefixed{position:fiexed;top;0}
		

*2，默认显示组件：
	
	{
		path:’*’,
		redirect:’home’
	}
  
*3,组件跳转：
	
	@click=“” / v-on:click
	methods:{
		this.$router.push({path:’/component-name’});
		//this.$router.push({path:’/knowledge’,query:{para:’para-val’}})
	}
  
*3.1,解决组件跳转时从下向上移动卡顿效果
	
	给组件加position：absolute；top：0；
  
*4,引入第三方css，js
	
	import ‘./assets/animate.css’
  
*5,子组件传递命令到父组件
	
	子组件：this.$emit(‘event-name’,’para’);
	在父组件使用子组件的地方添加@event-name = ‘father-method’
  
*6，父组件传递参数到子组件
	
	在父组件使用子组件的地方  v-bind:event-name=‘father-data’ / :event-name=‘father-data’
	子组件
	props:[‘event-name’],
	create:function(){
		console.log( this.event-name )
	}

*7,组件切换效果
	
	- 在<router-view>的组件里监听组件离开事件
		beforeRouteLeave (to, from, next) {
		    // 导航离开该组件的对应路由时调用
		    // 可以访问组件实例 `this`
		    next();
		    this.$emit('toapp','1');
		}
	- 在<router-view @toapp=“toapp”>组件下
		methods:{
			toapp(e){
				//通过e值改变<transition :name=“data-sth”>的name而改变动画	
			}	
		}
  
	.slide-enter-active {animation: slideInRight 0.5s; }
	.slide-leave-active {animation: slideOutLeft 0.5s; }
	@keyframes slideInRight {
		from {transform: translate3d(100%, 0, 0); visibility: visible; }
		to {transform: translate3d(0, 0, 0); }
	}
	@keyframes slideOutLeft {
		from {transform: translate3d(0, 0, 0); } 
		to{visibility: hidden; transform: translate3d(-100%, 0, 0); }
	}

	.oslide-enter-active{animation: slideInLeft 0.5s}
	.oslide-leave-active{animation: slideOutRight 0.5s}
	@keyframes slideInLeft{
		from{transform: translate3d(-100%, 0, 0); visibility: visible; }
		to{transform: translate3d(0, 0, 0); }
	}
	@keyframes slideOutRight{
		from{transform: translate3d(0, 0, 0); }
		to{visibility: hidden; transform: translate3d(100%,0,0); }
	}

	* 7.1多个组件平行滑动
		- 设置data-back:’ ’
		- 返回设置为2，前进设置为1
		- 浏览器返回按钮，this.back为空。解决：let backstair = this.back || 2 //设置返回
		- beforeRouterLeave( )

*8,使用jquery bootstrap.js
	
	- npm 引入jquery …npm  install jquery —save-dev
	- 更改webpack.base.conf.js
		var web pack = require (‘webpack’) 
		resolve ‘jquery’:’jquery’
	- plugins:[
    	new webpack.optimize.CommonsChunkPlugin('common.js'),
   		new webpack.ProvidePlugin({jQuery: "jquery", $: "jquery"})
 	]
	- 然后就可以在main.js中引入boostrap和jquery了
		import $ from 'jquery' 
		import './assets/bootstrap/js/bootstrap.min.js'
		import ‘./assets/bootstrap/css/bootstrap.css'

*9,点击事件控制 html 标签属性
	
	直接使用原生js
	var collapse = document.querySelector(‘.collapse').attributes.class.nodeValue;
	if (collapse.indexOf('in')!= -1) {
    	collapse = collapse.slice(0, collapse.length - 2);
	}
    document.querySelector('.collapse').attributes.class.nodeValue = collapse;

*10,绑定动态class,style
	
	:class=“{class-name:option}”    :class=“[{},{}]”
	:style=“{option: data-option}”

*11,html点击出现弹窗，窗口固定大小，底部页面不再滑动
	
	底部实现固定高，overflow-y
	窗口也是
	解决ios移动端滑动动画问题：-webkit-overflow-scrolling:touch
  
*12, 解决overflow:scroll的滑动条问题
	
	::-webkit-scrollbar{ width:0;height:1px}
	/*::-webkit-scrollbar-thumb {
      	border-radius: 5px;
     	 -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
     	 background: rgba(0, 0, 0, 0.2);
  	} */
    
*13,Swiper的使用
	
	- 引入vue-awesome-swiper.  npm install … —save
	- main.js.  import VueAwesomeSwiper from ‘vue-awesome-swiper'  Vue.use(VueAwesomeSwiper)
	
	- template
		<swiper :options="swiperOption" ref=“mySwiper">
		<!-- slides -->
 		<swiper-slide>I'm Slide 1</swiper-slide>
		<!-- Optional controls -->
 		<div class="swiper-pagination"  slot=“pagination"></div>
	- script
		import { swiper, swiperSlide } from ‘vue-awesome-swiper'
		data(){}
		swiperOption: {}
		components: {swiper, swiperSlide}
		computed: {swiper() { return this.$refs.mySwiper.swiper } }

	*13.1 slidesPerView控制多个slide同框宽度为body宽度平均

*14,解决bootstrapcss引用font的路径,和有的图片不能显示的问题
	
	- webpack.config.js中output输出路径的前缀，publicPath
	- 设置路径config/index.js 设置build的路径前加点
	
