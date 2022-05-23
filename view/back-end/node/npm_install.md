# npm install

> package.json 和 package-lock.json 的应用

## 要点

1. install [moduleName@version]，uninstall [moduleName] 会同时操作俩个文件的安装和卸载

2. 在有package-lock.json时候，进行npm install命令，会读取这个文件。但相对于没有它时，执行package.json会慢一些

## 解读

假设我们创建了一个新项目，它将使用express。 在运行npm init之后，在撰写本项目时，最新的express版本是4.15.4(默认情况下，npm 将安装最新版本)


因此在package.json中,"express":"^ 4.15.4"被添加作为依赖项。 假设明天，express的维护者会发布一个 bug 修复，所以最新版本变成了4.15.5。 然后，如果有人想要为我的项目做贡献，他们会克隆它，然后运行 npm install, 因为4.15.5是一个更高版本的主要版本，这是为他们安装的。 我们都有express依赖，但我们有两个不同的版本。 理论上，它们应该还是兼容的，但是也许这个 bug 会影响我们正在使用的功能，而我们的应用程序在使用Express版本4.15.4与4.15.5进行比较时会产生不同的结果.

而package-lock.json的作用就是用来保证我们的应用程序依赖之间的关系是一致的, 兼容的.

当不存在package-lock.json文件时，使用npm install时，会自动生成这个文件。当存在这个文件时，使用npm install安装，会安装package-lock.json里指定版本的插件，而且相比没有package-lock.json文件时，安装速度会快很多。因为package-lock.json文件里已经存在插件的版本、下载地址、整个node_modules的结构等信息。

当存在package-lock.json文件时，每次npm install安装就会安装package-lock.json里对应插件的版本。这样同一份package-lock.json文件，大家安装的插件版本一致。

如果某个插件版本变更。又不想删除package-lock.json文件，重新生成。方法是：npm install plugin@version，及重新安装这个插件，并指定插件的版本，这样，package.json和package-lock.json会自动更新。当然，也可以直接修改package-lock.json文件，这样npm install时，也会安装修改后的版本。但是如果只修改package.json，不修改package-lock.json，npm install还是会安装package-lock.json里的插件版本
