# 屡试不爽组件

## 颜色类

  1. [javascript-color-gradient](https://www.npmjs.com/package/javascript-color-gradient)
  > 渐变颜色

  ```js
  const colorGradient = new Gradient();

  const color1 = "#3F2CAF";
  const color2 = "#e9446a";
  const color3 = "#edc988";
  const color4 = "#607D8B";

  colorGradient.setMidpoint(20);

  colorGradient.setGradient(color1, color2, color3, color4);

  // outputs ["#4e4ab9", "#5d68c4", "#6d86ce", "#7ca4d9", "#8bc2e3", ...] 20个
  ```

  2. [rgb-hex](https://www.npmjs.com/package/rgb-hex)

  ```js
  const rgbHex = require('rgb-hex');

  rgbHex(65, 131, 196);
  //=> '4183c4'
  ```

## 声音类

  1. [howler](https://www.npmjs.com/package/howler)

  ```js
  var sound = new Howl({
    src: ['sound.webm', 'sound.mp3']
  });

  sound.play();
  ```

## 数据类

  1. [dayjs](https://www.npmjs.com/package/dayjs)

  ```js
  dayjs(val).format('YYYY/MM/DD HH:mm:ss')
  ```

## 服务类

  1. [http-server](https://www.npmjs.com/package/http-server)

  ```bash
  npm install --global http-server

  # 启动
  http-server

  # 或者更改端口
  http-server -p 9099
  ```

## 样式类

## 组件类

