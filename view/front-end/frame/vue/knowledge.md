# 知识点

### 双向数据绑定

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 data 选项，Vue 将遍历此对象所有的 property，并使用 Object.defineProperty 把这些 property 全部转为 getter/setter。

Vue 能够追踪依赖，在 property 被访问和修改时通知变更.

每个组件实例都对应一个 watcher 实例，它会在组件渲染的过程中把“接触”过的数据 property 记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

<img decoding="async" src="https://v2.cn.vuejs.org/images/data.png" width="500px"/>

数组和对象类型的值变化的时候，通过defineReactive方法, 借助了defineProperty，将所有的属性添加了getter和setter
get里面会做依赖搜集（dep[watcher, watcher]），set里面会做数据更新（notify，通知watcher更新）


### 生命周期

<img decoding="async" src="https://v2.cn.vuejs.org/images/lifecycle.png" width="500px"/>


- v-if 和v-show有什么区别？
- v-for 循环为什么一定要绑定key ?
- 组件中的data为什么要定义成一个函数而不是一个对象？
- vue性能优化
- vuex的五种状态
- Vuex 的 5 个核心属性是什么?
- 请说出vue.cli项目中src目录每个文件夹和文件的用法？
- $route和$router的区别
- 怎样理解vue单项数据流
- slot插槽
- vue常见指令
- vue中keep-alive 的作用
