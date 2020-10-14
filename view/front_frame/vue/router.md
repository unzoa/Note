# Router

#### 默认显示组件
```
{
  path: '*',
  redirect: 'home'
}
```

#### 缓存

> 利用route的meta组件属性设置keeplive布尔值

```html
<keep-alive>
  <router-view v-if="$route.meta.keepAlive"></router-view>
</keep-alive>

<router-view v-if="!$route.meta.keepAlive">
    <!-- 这里是不被缓存的视图组件，比如 page3 -->
</router-view>
```


- router.js
```js
{
  path: '/welcome',
  name: 'welcome',
  component: welcome,
  meta: {
    keepAlive: true
  }
}
```

#### 缓存后，各个路由页面滑动的页面距离一致
```js
const router = new Router{
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
}
```

#### 动态路由

案例
> 类似阿里云邮箱，菜单和邮件列表都能打开新的tab**<a target="_blank" href="/static/vue/menuContentTab.vue">完整代码</a>** ｜ [codepen预览](https://codepen.io/unzoa/project/editor/AMvWQg#)

1. 路由的path后面必须有对应的参数, ':'为界
```js
{
  name: 'Xxx',
  path: '/Xxx/:params1/:params2'
}
```

2. 组件内获取，直接使用 $route.paramsd对象

3. 多段动态路由, 夹杂静态str
```js
{
  path: '/Xx/:pramas1/haha/:params2'
}
```

4. **响应路由参数的变化**
  > 原来的组件实例会被复用，不过，这也意味着组件的生命周期钩子不会再被调用。

  - 解决方案1: 可以简单地 watch (监测变化) $route 对象
  ```js
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
  ```

  - 解决方案2: 使用 2.2 中引入的 beforeRouteUpdate 导航守卫
  ```js
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
  ```

5. 通配符

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

**含有通配符的路由应该放在最后**

当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数.

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```
