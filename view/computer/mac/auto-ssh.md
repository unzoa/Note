# Auto SSH

```
system: MacOS
need  : Homebrew，expect(命令行交互)
```

## Install

访问[Homebrew](https://brew.sh), 直接去下载安装[pkg包](https://github.com/Homebrew/brew/releases/latest).

```bash
brew install expect
```

## Start Use

1. 编写运行文件
2. 赋予权限
3. 添加双击执行程序

### 运行文件 198.sh

```sh
#!/usr/bin/expect -f

set user myname
set host 192.168.1.98
set password 123456
set timeout 60

spawn ssh $user@$host
expect "*assword:*"
send "$password\r"
interact
expect eof
```

### 赋予198.sh权限

```bash
chmod +x 198.sh
```

### 设置双击

点击198.sh，右键-->打开方式-->其他-->启用（所有应用程序）-->选择终端并设置为始终使用此方式打开


## 结束

这样198.sh文件就可以双击运行了
