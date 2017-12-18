# vuex-simple


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


# install Vuex

# setup vuex floder in src,import it path in main.js ,then add it name in Vue instance

# setup idnex.js getters.js actions.js mutations.js

# index.js

	import Vue from 'vue'
	import Vuex from 'vuex'
	import * as getters from './getters'
	import * as actions from './actions'
	import * as mutations from './mutations'

	Vue.use(Vuex)

	const state={
		count:0
	}

	const store = new Vuex.Store({
		state,
		getters,
		actions,
		mutations
	})

	export default store

# getters.js

	export const count = state => state.count

	* 计算属性computed中调用

# mutations.js

	export const increment = (state,value) => { state.count+=value}
	export const decrement = state => { state.count-- }

	* include type，handle
	* value is from a component
	* state只能在这里重置
	* state的重置，计算
	* 请求接口数据在action中进行					

# actions.js

	import api from '../api/api.js'

	export const increment = ({ commit },value) =>{
		let hahav = api.haha(value)
		commit('increment',value)
	}
	export const decrement = ({ commit }) =>  commit('decrement')

	* 请求接口，并将数据送回mutation那里重置commit(type,value)

# api.js
 
	import Vue from 'vue'//将用于调用接口

	const api={}

	api.haha = (requestData)=>{
		return requestData+'apihaha'
	}

	export default api

# main.js

	- import store from './vuex'
	- new vue({store})

# last step

	# in ur component import {mapGetters ,mapActions} from 'vuex'
	# then use the mapGetters in computed:{ ...mapGetters(['state-name']) }
	
	# then methods:{ ...mapActions(['mutation-type']) }
