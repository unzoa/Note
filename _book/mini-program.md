# 小程序

### 点击事件
bindtap="tap" data-pp="pp"
tap (e) {
    let data = e.currentTarget.dataset
    let pp = data.pp
}

### 组件 Components
根目录下创建Components文件夹
|-Components
|-|-aa
|-|-|-aa.js
|-|-|-aa.json
|-|-|-aa.wxml
|-|-|-aa.wxss

aa.js
- properties => 类似于Vue的props，这里属性需要表明数据类型
- data => 组件内参数
- methods => funcs

页面利用组件
需要在页面json中添加配置信息
{
    "usingComponents": {
        "aa": "/components/aa/aa"
    }
}

数据问题：
- 子组件请求公共数据，其他组件数据同步变化(
    不能利用app.js 作为类似vuex, 函数可请求，但是数据不会变化，也不会监听
)
- 父组件传递的数据可以同步到子组件中



### 注意事项
- 当设置app.json中设置了tabBar时，页面内再去控制跳转是不起作用的