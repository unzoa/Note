# 创建自己的npm包

## 配置package.json

- main属性是默认加载文件
- files属性，配置发布到npm上的路径
- 依赖安装在 dependencies

```json
"main": "./dist/unzoa-ui.common.js",
"dependencies": {
  // 依赖的包
},
"files": [
  "dist/*",
  "public/*",
  "src/*",
  "*.json",
  "*.js"
]
```

## 发布 npm 包

**此时应该有一个npm账号**

- 执行npm login, 输入用户名，密码，邮箱
  - 执行npm whoami 验证
- 执行npm publish
  - --access public, 记得把package.json中private改为false, 以设置为公开库

## 包更新

每次更新需要先更新版本号

- 查看版本 npm view unzoa-ui versions
- 更新版本号 原1.0.0
  + npm version []
    * patch 增加补丁 -> 1.0.1
    * minor 这个是小修小改 -> 1.1.0
    * major 这个是大改咯 -> 2.0.0
  + 1.0.1-aplha.1 > 追加本次修改
- npm publish
- npm view unzoa-ui versions > 输出 [ '0.1.0', '0.1.1' ]

## 删除包

### 目前

```bash
npm unpublish module-name
```

### 之前

首先如果就是想要删除当前的这个版本，执行命令:

```bash
npm unpublish module-name
```

去官网查看发现已经没有这个包了，如果权限不够加上 --force


#### 规范

取消发布包可能并不像想象得那么容易，这种操作是受到诸多限制的，撤销发布的包被认为是一种不好的行为（试想一下你撤销了发布的包[假设它已经在社区内有了一定程度的影响]，这对那些已经深度使用并依赖你发布的包的团队是件多么崩溃的事情！）

只有在发包的24小时内才允许撤销发布的包（ unpublish is only allowed with versions published in the last 24 hours），需要我们发邮件给官方来删除

即使你撤销了发布的包，发包的时候也不能再和被撤销的包的名称和版本重复了（即不能名称相同，版本相同，因为这两者构成的唯一标识已经被“占用”了）

例如我在撤销包后尝试再发布同一名称+同一版本的包
