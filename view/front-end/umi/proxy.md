# 代理配置说明

## 配置概述

项目使用 Umi 框架的代理功能，通过 `config/proxyConfig.ts` 文件进行代理配置。主要配置了两个代理路径：

1. `/api` - 用于 API 请求
2. `/user` - 用于用户相关请求

## 代理目标

代理目标服务器配置为：
```typescript
const apiPath = [
  "http://xx:81/"
][0];
```

## 代理配置详情

每个代理路径的配置如下：
```typescript
export default {
  '/api': {
    target: apiPath,
    changeOrigin: true,
    secure: false
    // 'pathRewrite': { '^/api' : '' } // 会去除请求时候的/api
  },
  '/user': {
    target: apiPath,
    changeOrigin: true,
    secure: false
  }
}
```

- `changeOrigin`: 设置为 true，用于支持跨域请求
- `secure`: 设置为 false，允许无效证书的 HTTPS 请求

## 使用方式

1. 在 `.umirc.ts` 中引入代理配置：
```typescript
import proxyConfig from './config/proxyConfig'
```

2. 在 Umi 配置中启用代理：
```typescript
export default defineConfig({
  // ...其他配置
  proxy: proxyConfig
})
```

## 注意事项

- 当前配置中注释掉了 `pathRewrite` 选项，这意味着请求时会保留 `/api` 前缀
- 如果需要去除请求时的 `/api` 前缀，可以取消注释 `pathRewrite` 配置