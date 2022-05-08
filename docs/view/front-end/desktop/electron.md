# 项目中引入Electron
> This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[7c4e3e9](https://github.com/SimulatedGREG/electron-vue/tree/7c4e3e90a772bd4c27d2dd4790f61f09bae0fcef) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html)

### 1. 安装模块
```bash
npm install electron@^2.0.18 --save-dev
npm install electron-packager@^12.2.0 --save-dev
```

### 2.调用electron-quick-start
> 把electron-quick-start项目中的main.js搬到vue的build文件中，并改个名字，这是最终dist下的文件**<a href="/_media/electron/electron.js" target="_blank">electron.js</a>**，与build下差异就在与入口文件的地址。

```js
  // and load the index.html of the app.
  // 意思就是加载首页文件，这里绑定打包后的dist/index.html
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))
```

### 3.编辑package.json
> 在package.json文件中增加两条指令，electron-dev和electron-build，这是最终的文件**<a href="/_media/electron/package.json" target="_blank">package.json</a>**

```json
  "scripts": {
    "dev": "node build/dev-server.js",
    "start": "npm run dev",
    "build": "node build/build.js",
    "lint": "eslint --ext .js,.vue src",
    "electron_dev": "npm run build && electron build/electron.js",
    "electron_build": "electron-packager ./dist/ --platform=win32 --arch=x64 --icon=./src/assets/favicon.ico --overwrite"
  }
```

#### 3.1 关于electron-packager的配置
> electron-packager sourcedir appname –platform=platform –arch=arch --icon=icon [optional flags…]

- sourcedir： 资源路径，在本例中既是 ./dist/
- appname：   打包出的App名称
- platform：  平台名称（windows是win32） (mac是darwin) （linux）
- arch：      版本，本例为x64
- icon：      App的图标，格式ico，相对路径, 尺寸256 x 256

### 4.打包出/dist,并配置electron
```
npm run build
```

1. 在dist文件夹下添加electron-quick-start下的的main.js改名electron.js和package.json
2. package.json里面的main属性，指向从electron.js
```json
{
  "name": "RFID",
  "version": "1.0.0",
  "description": "A minimal Electron application",
  "main": "electron.js",// 注意此处
  "scripts": {
    "start": "electron ."
  },
}
```
3. electron.js 更改app的入口文件路径
```js
// electron.js
mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'), // here
    protocol: 'file:',
    slashes: true
}))
```

### 5.electron_build
```
npm run electron_build
```

### 其他
#### 1. 配置窗口
```js
function createWindow () {
  // Create the browser window.
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 900,
    height: 630,
    minWidth: 900,
    minHeight: 630,

    resizable: false,
    fullscreen: false,
    fullscreenable: false,

    frame: false
  })
  ...
```

#### 2. 事件,配置electron.js

```js
  const ipc = electron.ipcMain
  ipc.on('customEventName', function () {
    // electron api useage
  })
```

#### 3. 使用
  - index.html 由于electron中引用问题，开发时暴露会出错
    ```
    <% if (htmlWebpackPlugin.options.isProduction) { %>
      <script>
        window.electron = require('electron')
      </script>
    <% } %>
    ```

  - Head.vue中应用
    ```js
    const {ipcRenderer: ipc} = window.electron || {
      ipcRenderer: {
        send () {
          console.log('development mode.')
        }
      }
    }

    // 执行想要的动作
    ipc.send('customEventName')
    ```

#### 4. static问题
> 打包后[.exe]找不到static下文件
> 因为resorce/app 需要引用的static路径错误，未找到正统解决办法，这里只有一个字体文件，故手动修改

#### 5. inno打包
  + 下载inno
  + 安装并运行
  + **执行**
      * File -> New
      * **page: application information**
          - Apllication name: 安装时候程序的名称
          - [next]
      * page: application folder [next]
      * **page: application files**
          - browser: find .exe
          - add folder: find full files folder
          - [next]
      * page: application shortcuts [next]
      * page: application documentation [next]
      * page: setup install mode [next]
      * page: setup languages
          - choose what u want
          - [next]
      * **page: compiler settings**
          - custom compiler output folder
          - compiler output base file name
          - custom setup icon file
          - [next]
      * page: Inno setup preprocessor [next]
      * [finish]

#### 6. 跨域问题

> 前端解决跨域，本项目a页面创建 iframe(目标，携带参数) 目标执行api请求后得到token，创建iframe(本项目b页，携带token等参数)，b页执行存储，a、b同源，所以a定时获取即可。

**当目标https证书在谷歌显示不安全情况下，需要对electron设置忽略证书安全性：**
```js
const {app} = require('electron')
app.commandLine.appendSwitch('ignore-certificate-errors') // 针对不安全证书问题

...
  new BrowserWindow({
    webPreferences: {
      webSecurity: false // 可以针对 not allowed to load local resource
    }
  })
...
```
