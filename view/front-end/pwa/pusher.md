# 消息推送

> ios测试成功，需要“添加到桌面”

## 必备需求

- 前端
  - 配置pwa
  - 配置sw
  - 手动注册设备信息
- 后端
  - https
  - nodejs web-push

### 打包环境和安装

```bash
# vite安装项目

npm i vite-plugin-pwa -D
```

### 配置

> 在打包时候 vite-plugin-pwa 会自动生成sw.js ，但是需要将新的sw的代码插入到打包的sw中

```js
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest', // 使用 InjectManifest 策略
      srcDir: 'src',                // 指定 Service Worker 模板所在目录，自动找 src 下的 sw.js 文件
      filename: 'sw.js',            // 生成的 Service Worker 文件名
```

### 自定义 sw.js 配置

```js
// 在 src/sw.js 中添加 import { precacheAndRoute } from 'workbox-precaching'; 和 precacheAndRoute(self.__WB_MANIFEST);。
// 这是 InjectManifest 策略的标准用法，确保插件能够正常工作并实现预缓存功能。
import { precacheAndRoute } from 'workbox-precaching';
// 必须有这个占位符，Workbox 会注入缓存清单
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});

self.addEventListener('push', function (event) {
  console.log('Push Notification received:', event)
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/biu/img/logo.png",
    badge: "/biu/img/logo.png"
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/') // 点击通知时打开的页面
  );
});
```



### 服务实现

> 基于 koa2 后端编写api

* TODO:
* 1. 接收并存储客户端信息注册到用户表
* 2. 推送队列表关联用户id
*  - 时间
*  - 事件内容
* 3. 定时任务进行推送

#### step 1 生成密钥

```js
const vapidKeys = webpush.generateVAPIDKeys();
console.log('Public Key:', vapidKeys.publicKey);
console.log('Private Key:', vapidKeys.privateKey);
```

#### step 2 设置 VAPID 公钥和私钥

```js
webpush.setVapidDetails(
  'mailto:your-email@example.com',
  'Public Key',
  'YOUR_PRIVATE_VAPID_KEY'
);
```

#### step 3 前端注册完sw后，获取接收通知权限

```js
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/biu/sw.js').then(() => {
    subscribeUser();
  }).catch(error => {
    console.error('Service Worker registration failed:', error);
  });
} else {
  console.log('Service Worker is not supported in this browser');
}

async function subscribeUser() {
  let registration = null
  navigator.serviceWorker.ready.then(res => {
    registration = res;
  }).catch(err => {
    console.log('navigator.serviceWorker.ready', err);
  })

  // **关键：** 请求接收推送通知权限
  let permission = await Notification.requestPermission();
  if (permission === 'granted') {
    try {
      // **关键：** 获取设备信息
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('Public Key') // Public Key 字符串 Base64 需要转换成 Uint8Array
      });

      // **关键：** 注册客户端信息
      axios.get('https://xx.com/x', {
        params: {
          endpoint: subscription.endpoint,
          expirationTime: null,
          keys: {
            p256dh: subscription.toJSON().keys.p256dh,
            auth: subscription.toJSON().keys.auth
          }
        }
      })
    } catch (error) {
      console.error('Failed to subscribe user:', error);
    }
  }
}

// 转换工具
function urlBase64ToUint8Array (base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
```

#### Step 4 后端接收到设备信息，推送消息

```js
/**
 * @description 发送推送消息
 * @param {object {
      endpoint: subscription.endpoint,
      expirationTime: null,
      keys: {
        p256dh: subscription.toJSON().keys.p256dh,
        auth: subscription.toJSON().keys.auth
      }
    }} subscription 前端传递过来的数据结构
  * @param { object {
      title: 'Hello!',
      body: 'This is a Web Push Notification from your Vite React PWA!',
    } } payload 推送内容
 * @returns {Promise}
*/
function send (subscription, payload) {
  payload = JSON.stringify(payload);
  return webpush.sendNotification(subscription, payload)
}
```

