# devServer

> 主要用于本地的开发，配置本地服务的各种特性。

- hot [boolean] 热更新
- inline [boolean] 实时刷新
- contentBase [boolean] 本地服务的文件根目录
- host [string] 域名
- port [number] 端口
- allowedHosts: [] // 请求域名的范围
- https [boolean] https服务
- compress [boolean] Gzip压缩
- open [boolean] 服务开启后，自动打开浏览器
- devtool: 'source-map' // 配置webpack是否生成sorce map方便调试
- watch [boolean] 监听文件修改后自动编译
