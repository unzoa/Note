# grep

```bash

# 查询文件中关键字符
grep "xxx" filename.x

# 查询文件夹下所有文件中包含关键字符
grep -r "xxx"

# 或者查询
grep -r -E "xxx|xxx"

# 并且查询, .* 同一行关键词之间的字符
grep -r -E "xxx.*xxx"

```