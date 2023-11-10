# 时间慢了8个小时

```bash
# 查看当前时间
date -R

# 修改
vim /etc/profile
# 尾部添加
export TZ='CST-8'

# 执行文件
source /etc/profile

# 检查时间已更新
date -R

# 重启docker，又变回去了
date "+%Z" # UTC

# 将宿主机中Shanghai时间文件复制覆盖docker中
cd /usr/share/zoneinfo/Asia
docker cp Shanghai backend:/etc/

# docker中
mv localtime localtion.bak
mv Shanghai localtime

# 重启docker
date -R # 正确时间
data "+%Z" # CST

# 此时，nodejs new Date() 获取的时间仍然是慢了8小时
# 尝试重启服务器
# 失败
```

```python
# 安装了py， datetime 获取的是对的
import datetime;
datetime.datetime.now()
# 正确
```

