# 进程

> 有两种方案 node进程 和 chrome进程

## Chrome

### Process

```js
chrome.processes.getProcessInfo([], true, function (info) {
 // info 即进程信息
})
```

```json
{
  "0": {
    "id": 0,
    "naclDebugPort": -1,
    "osProcessId": 9635,
    "privateMemory": 26136576,
    "profile": "",
    "tabs": [],
    "title": "Browser",
    "type": "browser"
  },
  "2": {
    "id": 2,
    "naclDebugPort": -1,
    "osProcessId": 9641,
    "privateMemory": 7860224,
    "profile": "",
    "tabs": [],
    "title": "GPU Process",
    "type": "gpu"
  },
  "3": {
    "id": 3,
    "naclDebugPort": -1,
    "osProcessId": 9643,
    "privateMemory": 27533312,
    "profile": "用户1",
    "tabs": [
      2
    ],
    "title": "Background Page: nwjs-v0.58.0-osx-x64",
    "type": "extension"
  }
}
  ```


### system 获取本机信息

[system.memory](https://developer.chrome.com/docs/extensions/reference/system_memory)

```js
chrome.system.memory.getInfo(function (info) {})
```

```json
{
  "availableCapacity": 14880768,
  "capacity": 8589934592
}
```

[system.cpu](https://developer.chrome.com/docs/extensions/reference/system_cpu/) 获取的是cpu运行时间

[system.storage](https://developer.chrome.com/docs/extensions/reference/system_storage/) 获取的是总存储

## Node

> xp系统 nodev5.12 API支持有限

```js
{
  memoryUsage: process.memoryUsage().rss, //  v0.1.16
  cpuUsage: process.cpuUsage().user, // v6.1.0
  resourceUsage: process.resourceUsage().maxRSS // v12.6.0
}
```
