# Socket 技术

配置方向：前后端、服务端

## 使用案例

技术栈：

- 前：react + socket.io-client
- 后：node + express + socket.io
- 服务端：nginx

### 配置

> 前端连接服务端，[2025-10-27]目前经验，虽然设置了socket命名空间，但是连接时候还是只能到域名 https://xx.com/socket.io/

#### 前端配置

```js
// baseURL 为服务端地址 ，携带二级路由 ，如 https://xx.com/biu2/
// network 为命名空间
function socketFn () {
  const url = `${baseURL.includes('biu2/') ? baseURL.replace('biu2/', '') : baseURL}network`
  let globalSocket = io(url, {
    timeout: 5000,                // 5秒超时
    reconnection: true,           // 是否开启自动重连，默认 true
    reconnectionAttempts: 0,      // 尝试重连的次数，0 为无限次
    reconnectionDelay: 1000,      // 第一次重连等待时间 (ms)
    reconnectionDelayMax: 5000,   // 最大重连等待时间 (ms)
    transports: ['websocket', 'polling'],
  });

  // 连接成功
  globalSocket.on('connect', () => {
    console.log('服务器在线，globalSocket id:', globalSocket.id);
  });

  // 断开连接
  globalSocket.on('disconnect', (reason) => {
    console.log('服务器离线，原因:', reason);
  });

  // 连接失败
  globalSocket.on('connect_error', (err) => {
    console.log('无法连接服务器:', err.message);
  });

  // 检查连接状态
  return globalSocket
}

console.log('当前连接状态:', globalSocket.connected ? '在线' : '离线');
```

### 后端配置

```js

// 创建 http server
const server = createServer(app);

// 初始化 Socket.IO
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // 根据实际情况设置允许的域名
    methods: ['GET', 'POST'],
  },
});

// 创建自定义命名空间
const networkNamespace = io.of('/network');

// 监听客户端连接
networkNamespace.on('connection', (socket) => {
  console.log('客户端已连接:', socket.id);

  socket.on('message', (msg) => {
    console.log('收到消息:', msg);
    io.emit('message', msg); // 广播给所有客户端
  });

  socket.on('disconnect', () => {
    console.log('客户端已断开:', socket.id);
  });
});
```

### Nginx

```conf
        location /socket.io/ {
          proxy_pass http://localhost:3300;
          proxy_http_version 1.1;

          # 必须加的头部，否则 wss 握手失败
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection "Upgrade";
          proxy_set_header Host $host;

          # 避免 400 Bad Request
          proxy_read_timeout 3600s;
          proxy_send_timeout 3600s;
        }
```
