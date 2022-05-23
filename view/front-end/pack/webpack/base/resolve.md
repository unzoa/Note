# resolve

> 配置webpcak如何寻找模块中对应的文件，例如：通过import导入的模块，resolve告诉webpcak去解析

1. alias
> 配置路径别名

```js
resolve: {
  alias: {
    'components': './src/components',
    'react$': '/path/to/react.js',
    '@': './src'
  }
}
```

2. extentions
> 配置文件后缀
在引用文件时候，例如vue文件 import Ha from '@/view/Ha' Ha.vue 在路径中可以不用写'.vue'文件后缀

```js
resolve: {
  extentions: ['.js', '.json', '.vue']
}
```
**webpack会一次找对应路径下该名称的文件 Ha.js => Ha.json => Ha.vue**

3. modules
> 配置webpack哪些目录查找第三方模块，默认只会查找node_modules。

```js
resolve: {
  modules: ['./src/components/', 'node_modules']
}
```
**这样就可以更简单的书写了   import Ha from 'Ha'   和从node_modules中引入一样**

4. descriptionFiles
> 配置描述第三方模块的文件名称 默认package.json

5. enforceExtention
> 配置后缀名是否必须加上

