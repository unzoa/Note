# Event Loop

- 宏任务
```js
// 整体代码、setTimeout、setInterval、promise.then
```
- 微任务
```js
// promise
```

**区别：**
- 微任务是元素
- 宏任务是一个集合，可以包着多个元素

**执行：**
元素立即执行，即 “微任务”立即执行，宏任务排后。

**注意：**
1. promise的执行函数注意微任务，then后的异步属于宏任务

