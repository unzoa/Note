# GSAP

Installation:
```bash
npm i gsap -D
# version ^3.4.2
```

- Use in vue:[资料](https://blog.usejournal.com/vue-js-gsap-animations-26fc6b1c3c5a)

- main use:

```js
import gsap from 'gsap'

// gsap(target, duration, vars)
gsap.to('.logo', 1, {x: number})
```

- use plugins:

```js
import gsap from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin'

gsap.to(
  '.logo',
  1,
  {
    motionPath: {
      path: '.path',
      aligin: '.path',
      alignOrigin: [0.5, 0.5], // logo的重心沿着path移动
      autoRotate: true // logo的横向方向和path水平
    },
    repeat: -1, // 重复动画
    ease: 'power1' // 动画的速度方案
  }
)

```