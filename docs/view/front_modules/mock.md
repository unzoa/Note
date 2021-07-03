# Mock
> 单独编辑mock.js，并引用即可

```js
import Mock from 'mockjs'

function getHappy (config) {
  return { happy: 'm really happy!' }
}

Mock.mock(/getHappy[\s\S]*?/, 'get', getHappy) // 正则匹配api名称携带参数
```
