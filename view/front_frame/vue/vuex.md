# Vuex

#### 创建store文件夹
```
idnex.js
getters.js
actions.js
mutations.js
```

#### main.js
```js
import store from './vuex'
new vue({
	...
	store
	...
})
```

#### index.js
```js
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
```

#### getters.js
> 计算属性computed中调用

```js
export const count = state => state.count
```

#### mutations.js
> tate只能在这里被编辑

```js
/**
 * @param  {[type]} state [store的state]
 * @param  {[type]} value [组件传递]
 */
export const increment = (state, value) => { state.count += value }
export const decrement = state => { state.count-- }
```

#### actions.js
> 请求接口数据在action中进行

```js
import ajax from '../ajax.js'

export const increment = ({ commit }, value) =>{
	ajax.get(apiName, {
		value
	}).then(res => {
		if (res.status === 200) {
			commit('increment', res.num)
		}
	})
}
```

#### 应用
```js
import {mapGetters, mapActions} from 'vuex'
computed:{
	...mapGetters(['state-name'])
}，
methods: {
	...mapActions(['mutation-type'])
}
```

##### 直接应用方法
```js
// getters
this.$store.state.obj

// mutations
this.$store.commit('mutationFunction', params)

// actions
this.$store.dispatch('actionsFunction', params)
```
