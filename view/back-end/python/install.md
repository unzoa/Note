# pip 安装

## 查看pip安装列表

```bash
pip3 list
```

## 使用国内镜像

中国的PyPI镜像源，最上方的源在我这访问速度最快，速度依次向下递减，所以试一试前几个就好了。

```bash
# 阿里云
http://mirrors.aliyun.com/pypi/simple/

# 中国科技大学
https://pypi.mirrors.ustc.edu.cn/simple/

# 豆瓣(douban)
http://pypi.douban.com/simple/

# Python官方
https://pypi.python.org/simple/

# v2ex
http://pypi.v2ex.com/simple/

# 中国科学院
http://pypi.mirrors.opencas.cn/simple/

# 清华大学
https://pypi.tuna.tsinghua.edu.cn/simple/

```

**如何使用镜像源**

```bash
# 使用镜像源很简单，用-i指定就行了，例如：
pip3 install -i http://pypi.douban.com/simple saltTesting
```

## 问题

### 安装超时

```bash
pip3 install ... --timeout=100 # 100秒
```