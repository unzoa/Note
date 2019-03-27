# vue-electron

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

```
``` bash
1===========
cnpm install electron --save-dev 
cnpm install electron-packager --save-dev

2===========
// 把electron-quick-start项目中的main.js搬到vue的build文件中，并改个名字electron.js
// electron的入口文件变成了vue build之后的文件地址，也就是dist文件夹下的 index.html，所以此时的electron.js 里面的引用地址也要变。
// build/electron.js

mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'), // here
    protocol: 'file:',
    slashes: true
}))

3===========
// 在package.json文件中增加一条指令，用来启动electron，即

"scripts": {
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "lint": "eslint --ext .js,.vue src",
    "electron_dev": "npm run build && electron build/electron.js", // added
    "electron_build": "electron-packager ./dist/ --platform=win32 --arch=x64 --icon=./src/assets/favicon.ico --overwrite" //added
},

// 关于electron-packager的配置
// electron-packager <sourcedir> <appname> –platform=<platform> –arch=<arch> [optional flags…]

// sourcedir 资源路径，在本例中既是./dist/
// appname 打包出的exe名称
// platform 平台名称（windows是win32） (mac是darwin) （linux）
// arch 版本，本例为x64

```

``` bash

4===========
# build electron application for production
npm run build

5===========
// 在dist文件夹下添加main.js和package.json
// 这个package.json与最开始electron-quick-start项目中的package.json文件一致，不过里面的main应该指向从build文件夹中的electron.js。

{
  "name": "RFID",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "electron.js",// 注意此处
  "scripts": {
    "start": "electron ."
  },
}

// electron.js 
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'), // here
    protocol: 'file:',
    slashes: true
}))

```

``` bash

# 最后
npm run electron_build

``` 

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
