# CANVAS

### 1. 解决加载图片模糊问题
- 获取 canvas
```js
  let canvasCon = document.querySelector('.canvas-con')
  let canvas = document.getElementById('canvas-id')
  context = canvas.getContext('2d')
```

- 获取设备的 ratio 的方法
```js
  let getPixelRatio = (context) => {
    let backingStore = context.backingStorePixelRatio ||
      context.webkitBackingStorePixelRatio ||
      context.mozBackingStorePixelRatio ||
      context.msBackingStorePixelRatio ||
      context.oBackingStorePixelRatio ||
      context.backingStorePixelRatio || 1
    return (window.devicePixelRatio || 1) / backingStore
  }
```

- 可以使得 canvas 携带 ratio
```js
  canvas.ratio = getPixelRatio(canvas)
```

- 设置 canvas 实际宽高
```js
  canvas.height = canvasCon.offsetHeight * canvas.ratio
  canvas.width = canvasCon.offsetWidth * .6 * canvas.ratio
```

- 设置 canvas 样式宽高
```js
  canvas.style.height = canvasCon.offsetHeight + 'px'
  canvas.style.width = canvasCon.offsetWidth * .6 + 'px'
```

- 将 canvas 缩小一半，相当于图像扩大二倍
```js
  context.scale(canvas.ratio, canvas.ratio)
```