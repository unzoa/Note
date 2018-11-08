# vuex-simple


## Build Setup
	# install dependencies
	npm install Vuex --save-dev

	# setup vuex floder in src
	# import it path in main.js
	# then add it name in Vue instance

	# setup idnex.js, getters.js, actions.js, mutations.js in this folder

##### main.js
	- import store from './vuex'
	- new vue({store})

##### index.js
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

##### getters.js
	export const count = state => state.count

	* 计算属性computed中调用

##### mutations.js
	export const increment = (state,value) => { state.count+=value}
	export const decrement = state => { state.count-- }

	* include type，handle
	* value is from a component
	* state只能在这里重置
	* state的重置，计算
	* 请求接口数据在action中进行					

##### actions.js
	import api from '../api/api.js'

	export const increment = ({ commit },value) =>{
		let hahav = api.haha(value)
		commit('increment',value)
	}
	export const decrement = ({ commit }) =>  commit('decrement')

	* 请求接口，并将数据送回mutation那里重置commit(type,value)

# last step
	# in ur component import {mapGetters ,mapActions} from 'vuex'
	# then use the mapGetters in computed:{ ...mapGetters(['state-name']) }
	
	# then methods:{ ...mapActions(['mutation-type']) }

# 其他方法应用
	- mutations
		* this.$store.commit('mutationFunction', params)
	- getters
		* this.$store.state.obj
	- actions
		* this.$store.dispatch('actionsFunction', params)


