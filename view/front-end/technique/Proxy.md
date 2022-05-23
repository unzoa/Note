# Proxy

## Plan 1.

A.html
  > A添加iframe后定时检测结果
  - iframe src=B.html?paramsB
    > 接受url上参数，并请求token
    - iframe src=C.html?paramsA
      > 接受参数存储

**注意：A、C同源, 与B不同源**
