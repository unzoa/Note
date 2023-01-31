# functional components & jsx

> 使用原则: 无状态、无生命周期的组件

## 两种使用

```html
<template functional>
  <div class="simple-temp">simple template</div>
</template>
```

```js
export default {
  name: 'u-retwi',
  functional: true, // 必须
  render (h, ctx) {
    // ctx = { data, props, children, ... }
    return <div class="u-retwi"></div>
  }
}
```

## ctx

```
props：提供所有 prop 的对象
children：VNode 子节点的数组
slots：一个函数，返回了包含所有插槽的对象
scopedSlots：(2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
parent：对父组件的引用
listeners：(2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是 data.on 的一个别名。
injections：(2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的 property。
```

## jsx syntax

1. click

```js
onClick={
  e => {
    e.stopPropagation()
    jump2vb(rowData.id)
  }
}
```

2. 数据绑定

```js
<Pics
  rowData={rowData}
  is-twi={true}
  />
```

3. if

```js
{
  rowData.pic_urls.length &&
    <Pics
      rowData={rowData}
      is-twi={true}
      />
}
```

4. v-lazy 类型需要绑定指令

将标签内容提取成 image.vue
```html
<template functional>
  <img
    v-lazy="props.url"
    :style="{...props.sty}"
    @click.stop="props.ev(props.imgs, props.ind)"
    />
</template>
```

class, style, onClick 关键词失效
以下处理方式, 待后续优化

```js
<ImageItem
  key={picIndex + id}
  url={pic.split('?')[0]}
  // 样式
  sty={sty}
  // 事件 & 参数
  ev={viewPic}
  imgs={picUrls}
  ind={picIndex}
  />
```

5. 将方法提取出函数式组件

函数式组件接受props
将方法提取出组件作用域, 利用class方式,注册参数


6. 改变绑定变量的值

操作dom改变对应值
