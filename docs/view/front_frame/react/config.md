# Config
> npm install react-app-rewired customize-cra --save-dev

- 修改package.json
```json
  // origin
  "scripts": {
    "dev": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  }

  // changes
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```
- 根目录下创建config-overrides.js
```js
  const {
    override,
    addWebpackAlias,
    addDecoratorsLegacy // 关于装饰器的
  } = require('customize-cra')

  const path = require('path')

  function resolve (dir) {
    return path.join(__dirname, '.', dir)
  }

  module.exports = override(
    addWebpackAlias({
      '@': path.resolve(__dirname, 'src'),
      '_s': path.resolve(__dirname, 'src/store'),
      '_c': path.resolve(__dirname, 'src/components')
    }),

    addDecoratorsLegacy()
  )
```
