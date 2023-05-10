# pyenv

## 通过homebrew安装pyenv

如果brew报错或失败

先卸载
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
```

再安装
```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装失败，下载install.sh到本地，然后执行
```sh
/bin/bash -c install.sh
```

测试
```sh
brew -v
```

## 安装

```sh
brew install pyenv
brew install pyenv-virtualenv
```

## 安装python

查看可安装版本
```sh
pyenv install -l
```

[去官网下载](https://www.python.org/ftp/python/)对应的版本，例如Python-3.11.3.tar.xz

首先我们在pyenv的根目录创建一个cache文件夹，将上面下载的版本放在cache下
```sh
mkdir -p $(pyenv root)/cache/
```

然后我们先执行一下安装命令，比如pyenv install 3.11.3，pyenv就直接应用cache下的对应版本了。

可查看路径： $(pyenv root)/version/3.11.3

## 创建虚拟环境

创建名为“jarvis”的基于python3.11.3的虚拟环境

```sh
pyenv virtualenv 3.11.3 jarvis
```

可查看路径： $(pyenv root)/version/3.11.3/envs/jarvis

## 使用虚拟环境

命令|描述
:---|:---
pyenv virtualenv 3.8.3 env383 | 创建 3.8.3 版本虚拟环境
pyenv virtualenvs | 显示环境
pyenv activate env383 | 激活使用指定的虚拟环境
pyenv deactivate | 退出当前虚拟环境
rm -rf .pyenv/versions/3.8.3 | 删除版本环境
rm -rf .pyenv/versions/env383 | 删除虚拟环境


启动
```sh
pyenv activate jarvis
```

报错
```sh
Failed to activate virtualenv.

Perhaps pyenv-virtualenv has not been loaded into your shell properly.
Please restart current shell and try again.
```

MacOS

修改.zshrc文件
```
export HOMEBREW_NO_AUTO_UPDATE=true

eval "$(pyenv init --path)"
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"
```

重载.zshrc
```sh
source ~./zshrc
```

启动
```sh
pyenv activate jarvis
```
启动成功，终端名字会变成jarvis


退出
```sh
pyenv deactivate
```
退出成功，终端名字会变成默认