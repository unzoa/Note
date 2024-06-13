# 版本和虚拟环境

> 我最终选择，python自带的

## 尝试过

conda、pyenv，忘了conda了，不过安装和使用pyenv，折腾的够呛，不论在mac还是windows上

## python自带

1. 官网下载多个版本python安装包
2. 安装时候，选中**添加path**，并且自动默认安装
3. 检查环境变量，cmd运行 SystemPropertiesAdvanced，**多个版本会有排序，此处伏笔**
4. 使用py -3.x 可以命令行使用，按网上的意思，这一步切换了全局默认版本，**但是**，3中伏笔，切换会失败，和顺序有关系，及时新开cmd。
5. 使用**虚拟环境**解决来回切换版本问题
```bash
# 创建新项目，在根目录下执行
py -3.x -m venv .venv
# 其中，
# 3.x是指定的电脑上安装的版本
# .venv 是虚拟环境目录
# 启动虚拟环境，否则pip依然是伏笔中顺序第一版本
.venv/Scripts/activate
```

## macos

从官网上下载了3.12，3.11并顺序安装，python命令不能识别
```bash
ls /usr/local/bin | grep python

python3
python3-config
python3-intel64
python3.11
python3.11-config
python3.11-intel64
python3.12
python3.12-config
python3.12-intel64


python3 --version

Python 3.11.9

```

新建项目

```bash
py -3.11 -m venv .venv
zsh: command not found: py
# 在 macOS 上，py 命令通常不是默认安装的，而是 Windows 上的 Python Launcher 提供的命令。

python3 -m venv .venv
source .venv/bin/activate

# pip安装完可以通过以下命令退出虚拟环境：
deactivate
```




