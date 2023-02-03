# Cache

Cache 接口为缓存的 Request / Response 对象对提供存储机制，例如，作为ServiceWorker 生命周期的一部分。请注意，Cache 接口像 workers 一样，是暴露在 window 作用域下的。尽管它被定义在 service worker 的标准中，但是它不必一定要配合 service worker 使用。

**除非明确地更新缓存，否则缓存将不会被更新；除非删除，否则缓存数据不会过期。**

**需要定期地清理缓存条目，因为每个浏览器都硬性限制了一个域下缓存数据的大小。缓存配额使用估算值，可以使用 StorageEstimate API 获得**
```js
navigator.storage.estimate().then(function(estimate) {
  console.log(estimate.usage, estimate.quota)
})
```

## 示例

```js
var CACHE_VERSION = 1;

// 简写标识符映射到特定版本的缓存。
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  // 在 promise 成功完成之前，活跃的 worker 不会被视作已激活。
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) == -1) {
            console.log('Deleting out of date cache:', cacheName);

            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);

  event.respondWith(

    // 打开以'font'开头的 Cache 对象。
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log(' Found response in cache:', response);

          return response;
        }
      }).catch(function(error) {

        // 处理 match() 或 fetch() 引起的异常。
        console.error('  Error in fetch handler:', error);

        throw error;
      });
    })
  );
});
```
