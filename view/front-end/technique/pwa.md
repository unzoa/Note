# Progressive Web App

## 在iphone上全屏

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
```

在vue中配置config

```json
  pwa: {
    name: 'unzoa',
    appleMobileWebAppCapable: 'yes',
    /**
     * @appleMobileWebAppStatusBarStyle
     * @value black-translucent (status bar tranparent)
     * @value default (white bg, black text & symbol)
     * @value black (all black)
     * */
    appleMobileWebAppStatusBarStyle: 'black-translucent',

    manifestOptions: {
      assetsVersion: 'v1.0.3',
      name: 'unzoa-weibo',
      short_name: 'unzoa', // 添加到主屏幕时候显示的名字
      start_url: './?standalone=true',
      display: "standalone",
      "background_color": "#000000",
      "icons": [ // 添加到主屏幕时候的图标
        {
          "src": "img/IMG_1407.JPG",
          "sizes": "192x192",
          "type": "image/jpg"
        },
        {
          "src": "img/IMG_1407.JPG",
          "sizes": "512x512",
          "type": "image/jpg"
        },
        {
          "src": "img/IMG_1407.JPG",
          "sizes": "192x192",
          "type": "image/jpg",
          "purpose": "maskable"
        },
        {
          "src": "img/IMG_1407.JPG",
          "sizes": "512x512",
          "type": "image/jpg",
          "purpose": "maskable"
        }
      ]
    },
    // 图标
    iconPaths: {
      faviconSVG: '',
      appleTouchIcon: 'img/IMG_1407.JPG',
      favicon32: 'img/IMG_1407.JPG',
      favicon16: 'img/IMG_1407.JPG',
      maskIcon: 'img/pic.png',
      msTileImage: ''
    },
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
```