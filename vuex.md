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

``` bash
# install Vuex
npm install vuex --save

# setup vuex floder in src,import it path in main.js ,then add it name in Vue instance

# setup idnex.js getters.js actions.js mutations.js
```
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

	* like vuex computed

# mutations.js

	export const increment = (state,value) => { state.count+=value}
	export const decrement = state => { state.count-- }

	* like state compute , include type，handle
	* value argument is from a component, format like this.increment(this.data-name) or this.increment({11:'',22:''})					

# actions.js

	import api from '../api/api.js'

	export const increment = ({ commit },value) =>{
		let hahav = api.haha(value)
		console.log( hahav )
		commit('increment',value)
	}
	export const decrement = ({ commit }) =>  commit('decrement')

	* named as mutation 's type，request datas and commit type

# api.js
 
	import Vue from 'vue'//将用于调用接口

	const api={}

	api.haha = (requestData)=>{
		return requestData+'apihaha'
	}

	export default api

# main.js registe

	- import store from './vuex'
	- new vue({store})

# last step

	# in ur component import {mapGetters ,mapActions} from 'vuex'
	# then use the mapGetters in computed:{ ...mapGetters(['state-name']) }
	# then methods:{ ...mapActions(['mutation-type']) }

	# the value of use vuex
	** in the same component , the state is sync
	** router-link to anther component ,the state sync too