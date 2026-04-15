# Node.js + PM2 服务 RSS 不回落问题解决记录
## 问题背景
- 业务：Node.js 服务处理图片批量下载/上传，使用 `axios stream` + 七牛云 `putStream`
- 现象：服务运行正常、无报错，但 RSS 内存随任务执行持续上涨，任务结束后不回落，长期高位占用
- 根因定位：非 JS 堆泄漏，而是**堆外内存（Buffer）峰值 + glibc 内存分配器不归还内存**导致的 RSS 滞胀与内存碎片

---

## 解决步骤（完整流程）
### 1. 核心方案：替换内存分配器为 jemalloc
jemalloc 相比系统默认的 glibc，对高并发 I/O 场景的内存碎片控制更好，且会主动向操作系统归还空闲内存，完美解决该问题。

#### 1.1 安装 jemalloc
```bash
# 先处理 apt 更新报错（MySQL 源签名问题）
apt -y update --allow-unauthenticated

# 安装 jemalloc
apt -y install libjemalloc-dev
```

#### 1.2 验证安装路径
```bash
find /usr -name "libjemalloc.so"
# 预期输出：/usr/lib/x86_64-linux-gnu/libjemalloc.so
```

#### 1.3 全局生效 jemalloc（当前终端）
```bash
export LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so
```

---

### 2. 重启 PM2 服务（带 jemalloc）
#### 2.1 停止并删除旧进程
```bash
pm2 stop all
pm2 delete all
```

#### 2.2 重新启动服务（所有进程自动继承 jemalloc）
```bash
# 直接启动所有服务，或按业务单独启动
pm2 start app.js --name "app"
pm2 start index-download.js --name "index-download"
pm2 start index-get.js --name "index-get"
pm2 start local.js --name "local"
```

#### 2.3 开启文件监控（可选）
```bash
# 给需要的进程开启文件变动自动重启
pm2 restart all --watch
pm2 save
```

---

### 3. 效果验证
1. 执行任务前查看内存：`pm2 monit`
2. 执行批量图片下载/上传任务，观察内存峰值
3. 任务结束后再次查看：`pm2 monit`
- 正常现象：任务期间内存短暂上涨（如峰值 260MB），任务结束后自动回落至低水位（如 107MB），不再高位滞留

---

## 关键配置说明
### 1. jemalloc 核心优势
| 对比项 | glibc 默认分配器 | jemalloc |
|--------|------------------|----------|
| 内存碎片 | 高，易产生碎片 | 低，对 I/O 场景优化 |
| 内存归还 | 不主动归还，RSS 易滞胀 | 主动向 OS 归还空闲内存 |
| 多线程缓存 | 无限制 arena，内存占用高 | 可配置 arena 数，占用更低 |

### 2. PM2 额外优化（可选）
可通过 PM2 配置进一步兜底，避免极端场景内存溢出：
```javascript
// ecosystem.config.js（可选，无配置文件时可忽略）
module.exports = {
  apps: [{
    name: "index-download",
    script: "index-download.js",
    max_memory_restart: "512M", // 超过阈值自动重启
    node_args: ["--max-old-space-size=384"] // 限制 V8 堆大小
  }]
}
```

---

## 注意事项与避坑
1. **`LD_PRELOAD` 生效范围**：仅当前终端会话生效，如需永久生效，可在 `/etc/profile` 或 PM2 启动脚本中添加该环境变量
2. **服务重启不影响 jemalloc**：执行 `pm2 restart` 或服务器重启后，只要环境变量配置正确，jemalloc 会自动生效
3. **非业务代码泄漏**：任务结束后 RSS 回落，即可确认无 JS 堆泄漏或未释放资源，无需修改业务逻辑
4. **监控配置**：开启 `--watch` 后，建议添加 `--ignore-watch="node_modules logs"` 避免不必要的重启

---

## 总结
- 核心结论：该场景下的 RSS 不回落问题，本质是**分配器特性**而非业务代码问题，jemalloc 是最优解决方案
- 关键效果：任务执行时内存正常波动，任务结束后主动归还，内存占用稳定可控，彻底解决了长期高位占用的问题