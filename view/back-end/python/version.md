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

