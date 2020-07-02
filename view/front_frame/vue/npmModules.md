# 创建自己的vue-npm ui包

1.安装一个纯净的带有babel,eslint的vue-cli

2.设置库的构建，在project.json中配置
```json
"scripts": {
  "serve": "vue-cli-service serve",
  "build": "vue-cli-service build",
  "build-bundle": "vue-cli-service build --target lib --name unzoa-ui ./src/components/index.js",
  "lint": "vue-cli-service lint"
},
```
**build-bundle命令中, --name 接指定要库的名字**

3.后面接库的入口文件，使其在倒入时候自动注册vue组件
```js
import Vue from 'vue'
import TopBar from './TopBar.vue'
const Components = {
  TopBar
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})

export default Components
```

4.然后配置package.json中，增加main属性，当我们引入该组件库时，默认加载main的路径文件
```json
"main": "./dist/unzoa-ui.common.js"

5.配置package.json中files属性，配置发布到npm上的路径
```json
"files": [
  "dist/*",
  "public/*",
  "src/*",
  "*.json",
  "*.js"
]
```

6.执行npm run build-bundle

7.发布
**此时应该有一个npm账号，没有就去npm创建一个**
- 执行npm login, 输入用户名，密码
- 执行npm whoami 验证
- 执行npm publish --access public, 记得把package.json中private改为false, 以设置为公开库

8.测试应用
npm install unzoa-ui -D

```js
import 'unzoa-ui'
```
组件库编写时候，就直接注册了，所以此时可以直接应用了 <TopBar />

9. 组件库更新
组件库是有版本号的，每次更新需要先更新版本号
- 查看版本 npm view unzoa-ui versions
- 更新版本号 原1.0.0
  + npm version []
    * patch 增加补丁 -> 1.0.1
    * minor 这个是小修小改 -> 1.1.0
    * major 这个是大改咯 -> 2.0.0
- npm publish
- npm view unzoa-ui versions
> [ '0.1.0', '0.1.1' ]

10.删除包
取消发布包可能并不像想象得那么容易，这种操作是受到诸多限制的，撤销发布的包被认为是一种不好的行为（试想一下你撤销了发布的包[假设它已经在社区内有了一定程度的影响]，这对那些已经深度使用并依赖你发布的包的团队是件多么崩溃的事情！）

首先如果就是想要删除当前的这个版本，执行命令npm unpublish unzoa-ui，去官网查看发现已经没有这个包了，如果权限不够加上 --force

- 根据规范，只有在发包的24小时内才允许撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours），需要我们发邮件给官方来删除
- 即使你撤销了发布的包，发包的时候也不能再和被撤销的包的名称和版本重复了（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）
- 例如我在撤销包后尝试再发布同一名称+同一版本的包
