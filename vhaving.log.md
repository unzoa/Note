1,home下面子路由
- 需要一个redirect:'/name'
- 需要children:[{ path:'/name',component:name}]

2,点击navli跳转路由
- 带参数 <router-link to="path:'',query:{id:''}">
- 接收参数	this.$route.query.id

3,在原项目下
- 添加一个yuli
-- router.js  添加路径需要path，name，component
-- home.vue 下增加yuli
-- 点击跳转
-- ****需要在系统菜单中设置新的菜单，并建立一个路由文件，并且重新登录

4，panels数据，包括label，placeholder，text都是接口数据
-- 组件来自components下floder，其中包括条件判断
-- 之后增加选择数据，可以按接口判断组件显示

5，页面1

**** 放在原来后台中，那么数据是从接口内获取，表头是对象固定字段，点击按钮显示详细资料

** 类似view页面的table组件到panel的流程

** 耦合问题：用我自己方法，接口数据展示，查看详细按钮跳转或者弹窗显示，但是需要兄弟组件的通讯$emit事件派发，造成了组件之间的通讯流程繁琐；

** 原后台用了vuex的方法，设置“公共类”，比如在table点击编辑后显示panel的事件，“没有进行对父组件的事件派发”；
尤其是编辑按钮的operate事件中携带的参数method是在view中获取的方法，经查看是一个对象{'list':'company_list'}或者{'list':'stock_list'} 而list有关联vuex；

**** 单独写出来
** 首页从view接收过来数据
** 点击按钮显示进行兄弟组件通讯，弹窗，判断需要显示的type表格类型，并带入数据

- 1，列表页
- 2，详细页

**** 在原基础上写
** 复制table 的方法列出表单内容，并可以获取行内详细数据
** 点击查看详情，只显示label和内容

**** 需求重申
** 需要一个根据数据变化的详细页面
** 现在的panel和对应的view的data，每个view都有个单独的panels-data
** 由此显示panel内的响应表格
** 在panel内遍历，检查显示分组件
** 分组件数据从哪来的？？？
** 从panel组件传递过来child的不是接口数据
** 可以，在panle子组件的watch的infodata（val）console.log
** ...mapGetter(['infodata'])
** 在vuex内有，mutation.js内有箭头函数指向（state，data）=>   JSON.转义data，so data？？？？
** 到了action.js查找到getInfo对象
** 在inputer组件infodata的参数val从哪里来？
** 最初的munted？？

**** vuex理解
** single->VUEX-getter.js-state.single->mutation.js-state.single-state.data[index]-getdata（obj）->action-getdata（obj）加载了api
** api.list，resolve（response.body.Response）没有return，也没有commit
** action中调用api出的promise，commit（'getdata',(arg参数) api返回的结果）
** mutation getdata作用state.data= 返回结果,接着返回state.single
** getter获取state.single 
** 组件得到数据，Done

**** 获取数据用的vuex方法都是获取什么的

**** vuex初始
** 安装 npm install vuex --save
** main.js 引用，use，实例中添加import store from  './vuex'
** vuex下index.js  getters.js   actions.js   mutations.js
** index引用vue vuex以及其他三个js
** getters 是index仓库store的计算属性
** mutation 事件注册 type = handle
** actions 唤醒事件，并提交 type = commit（type）

**** 方法使用
** 传参：
** 在methods中可以调用mapActions
** 那么传参：
在组件自定义方法内调用的 this.actionsfunc（{custom-name：data-val，}）
actions内export const type = （{commit}, value）=>{ commit('type',value)}
mutatins内 export const type = (state,value)=>{ state.statename 's operate func with value  }
** state.statename在某个组件内操作变化，在另一个组件内的这个statename应该变化吗？
** 在同一个路由下可以同步
** 路由跳转可以同步

**** 创建api.js:  http接口获取数据
** create floder api ，setup api.js, import Vue, const api={},export default api

**** 把方法写在vuex的actions中，或者写在js文件里面，js和图片加载顺序会不规则????
** 如果写在本文件下就好了
** maybe js or other file load later or earlier than here write.

**商城**
* anywhere启动
* gulp watch 
* 删除template.js执行tmod创建新的template.js