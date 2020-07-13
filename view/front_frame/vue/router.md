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

```
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
