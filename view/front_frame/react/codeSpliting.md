# Code Splitting
> npm install @loadable/component

- 应用
  ```js
    // router.js
    import React from 'react'
    const aa = loadable(() => import('aa.js'), {falback: <Loading />})
  ```

