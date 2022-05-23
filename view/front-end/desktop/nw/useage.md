# Useage

## Hello World

[编写文件](https://nwjs.org.cn/doc/user/Getting-Started.html)
[打包](https://nwjs.org.cn/doc/user/Package-and-Distribute.html)

1. 普通文件 (推荐)

Windows和Linux系统, 可以将应用的文件放到NW.js目录下 , 确保 nw(或者 nw.exe)与 package.json在同级目录下 . 或者将应用文件放入名为 package.nw目录中 , 该目录与 nw(或者 nw.exe)在同级目录下 . 需要【注意】 , package.json需要在 package.nw目录中 .

Mac系统 , 将应用相关文件放入名为 app.nw中 , 同时将该文件添加到 nwjs.app/Contents/Resources/中 . 同样 , package.json需要在 app.nw中 .

推荐使用普通文件打包方式 .

2. ZIP文件（略）


## 打包成安装程序

1. Windows

nw.exe图标替换工具 , 如Resource Hacker nw-builder node-winresourcer.

你可以创建一个安装程序完成应用文件的安装 , 如Windows InstallerNSISInno Setup.