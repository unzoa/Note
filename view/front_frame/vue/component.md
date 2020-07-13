# 组件

##### 1.父组件 =props数据=> 子组件
> 传递到组件中的数据props，最好是子组件正好能应用的

- 在父组件使用子组件的地方
```
v-bind:resName="fatherData"
:resName="fatherData"
```

- 子组件
```js
props: ['resName'],
create () {
  console.log( this.resName )
}
```

### 2.子组件传递 =命令=> 父组件
- 子组件：this.$emit('eventName', {'para1': 'para1'}, id);
- 在父组件使用子组件的地方添加 @eventName="fatherMethod"
```js
export default {
  methods: {
      fatherMethod (res, id) {
        console.log(res.para1, id)
      }
  }
}
```

### 3.绑定动态class,style
```
  :class="{class-name: Boolean}"
  :class="[{},{}]"
  :style="{option: data-option}"
```

### 4.动态组件
- 组件名称和要绑定的数据放在数组里面
```js
export deafult {
  data () {
    comps: [
      {
        'componentName': 'com1',
        res: res1
      }
    ]
  }
}
```
```
<component
  :is="i.componentName"
  v-for="(i,j) in comps">
</component>
```

### 5.组件跳转
1. click event
```
v-on:click
@click=""
```

2. 直接跳转
```js
this.$router.push({
  path: '/component-name'
})
```

3. query
> 参数path, query
```js
  this.$router.push({
    path:'/knowledge',
    query:{para1:'para1-val'}
  })

  this.$route.query.para1
```

4. params
> 参数name，params
> 目标路由刷新会忘记参数，需要用到动态路由匹配，在配置路由时候增加固定的参数

  ```js
  // routers.js

  {
    path: '/knowledge/:id',
    ...
  }

  // 组件
  this.$router.push({
    name:'knowledge',
    params:{id: '1992'}
  })
  this.$route.params.para2
  ```

4.1 动态路由案例
> 类似阿里云邮箱，菜单和邮件列表都能打开新的tab**<a target="_blank" href="/static/vue/menuContentTab.vue">完整代码</a>** ｜ [codepen预览](https://codepen.io/unzoa/project/editor/AMvWQg#)

### 插槽 slot
> 针对vue@^2.6.0

##### 子组件
> name定义插槽名字，d等其他属性名表示传递的prop

```
<slot name="slotName" d="aa"></slot>
```

##### 父组件
> v-slot:插槽名称 插槽作用域: props

```
<custom-comp>
  <template v-slot:slotName="props">
    {{props.d}}
  </template>
</custom-comp>
```
