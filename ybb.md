# 0912
**adapt**
	
	* body jq control 100% 100%
	* each window input is die width
	* button style change
	* table style change

**角色管理-用户管理**

	* 权限管理xx树形结构
		- 需再议
	* 用户管理xx城市选择

# 0913
**修改个页面样式**
	
	* 表格问题
	* login页面适应
	* 全部适应

# 0914

	* 融合代码，更改冲突，提交代码
	* 高度自适应
		- @medai (max-height)
	* 侧边栏样式
	* ifame border
		- height?????
		- index页面的bootstrap的::before和::after的问题
	* container页面内开标签
	* curt搜索按钮问题，替换按钮
	* 突然出现中文乱码问题，编译器坏了

# 0915

	* 窗口的适应问题
	* 还款记录适应问题
		- 高度适应问题
		- modal的栅格需要变成xs

# 0916 
	
	* 更新、解决冲突
	* 检查登陆权限
	* 大的窗口问题（催收记录窗口问题）
		- 催款记录 datagrid 样式出现不加载，导致表格只显示页码一行，其他详细内容不能看见，需要手动重写样式
		
# 0918 
	1,详细数据，大窗口首次清空bug解决
	2,首次进入localhost也需要验证登陆
	3,loginname
	4,menu添加url
	* 树形结构
		- 角色分配：选择权限
		- 权限分配：添加权限
		- 用户管理：添加城市按钮适应
		

# 0919
	* 滚动条高度
	* 树形结构
		- 用户管理：城市树
			- 关闭按钮定位问题
			- 点击省份窗口定位到市区，即向下移动
	* 新增窗口和页面问题
		- 渠道管理验证  easyui的datagrid问题
		- 催收记录数据空bug
	* 侧边栏点击有标记:改成标记二级菜单，最小高度设置
	* 权限管理 
		- tab标签和增加菜单按钮文字要统一
		- 增加菜单modal  的菜单名称placeholder不对应
	* 权限选择标记
	* 还款中的input长度和对齐问题
	* 登录页替换

# 0920
	* 待电审 
		- 电话审核按钮的  modal close按钮事件 huanyuanFenkong();
	* 风控审核
		- 更换弹窗
	* 批款页面 
		- 两个按钮一样大
	* 权限管理
		- 文字头
		- 弹窗按钮文字
		- 点击保存后弹窗消失
		- 删除操作提示
	* 部门管理
		- 弹窗文字编辑
		- 保存隐藏弹窗，删除操作求情后提示
	* 权限分配
		- 主菜单颜色变蓝
	* 页面缩小后，查询条件需要调整位置
	* 详细资料
		- 换弹窗
		- 上传文件按钮点击效果代替input file
	* 城市管理
		- 换弹出框
	* 用户管理
		- iframe适应
	* 各个表的checkbox
	* 侧边栏
		- 二级菜单下边框
	

# 0921

	* 操作列一定展现，冻结状态
		- http://blog.csdn.net/gissunchangfu/article/details/52859618
		- 只能冻结在左侧，此链接中方法会将列号也冻结在右侧，除非不需要列号了
	* 跳tabs刷新
	
	* 主菜单图标（）
	* 权限分配
		- 拥有权限省略显示，加按钮点击显示tip
			??事件启动
		- 没有发送一级菜单的vid（数据问题）
		- 添加全选按钮
	* 用户管理
		— 选择城市添加全选按钮
	* 部门管理
		- 保存按钮文字和事件
	* 风控审核
		- 加关闭按钮
	* 还款计划
		— 保存后关闭

# 0922

	* 权限分配的权限，无限分级
		- 改成现有树形的样式，添加全选功能
		- 跳页面，增加页面，传递参数，接收参数，查询permission，展示数结构，提交，关闭窗口
	* 其他datagrid的省略字处理
	* popover的事件处理问题
	* 贷款申请
		- 分区域，加表头
	* 调试其他bug
	* 浏览器版本检测提示
		— 未解决

# 0925

	# 用户权限编辑，查看权限的id重复
		- 所有的查看都是同一个id，因为之前的操作都在同一个接口里面，怎么返回的（查看和id）
	# 部门的名字不能重复

	* 删除加提示删除再操作
	* popover不跟随页面移动
	* 权限分配加刷新页面按钮
	* 渠道管理未显示全的
	* 表格的短的需要自适应
	* 用户管理
		- 更新用户信息框，权限加 fieldset
		- 操作按钮加margin 
		- 表格footer英文change
		- 权限列改成区域权限
	* 贷款申请
		- 详细信息change to 财务信息
		- fieldset border change color
		- fieldset 内table bgcolor change
	* 等待电审核 
		- 电审框change style
	* 还款记录里，已还款的变成

# 0926

	1, 批款等各个表格适应
	2, 还款中，催收(催收记录表格高度降低调整，空记录状态显示；新增催收表格调整；)
	3, 解决关闭tab功能，获取url参数中文乱码问题
	4, 菜单美化
	5, 报销记录的查看图片弹窗
	6, 部门的类型select，value（admin，user）
	7, 贷款申请，dk.js bug
	8, 还款记录的明细添加popover

# 0927

	1，还款记录的上下分栏需加百分比
	2，滚动条去掉背景
	2.1, easyui 的datebox加扩展清空功能
	2.2, 报销记录新增数据的窗口更改modal，去掉input file的保存按钮
		？ 上传图片不能太大
		？ 提交时候500
	3，用户管理，更新用户基本信息的input需要重新加验证
	4，查找清理浏览器缓存方法
		<meta http-equiv="pragma" content="no-cache"> 
		<meta http-equiv="Cache-Control" content="no-cache, must-revalidate"> 
		<meta http-equiv="expires" content="0">
	
	5, 用户管理的表格加混合表头
	6, 类似还款中首列冻结
	7, 表格适应后出现滚动条，表头错位5px问题？？未解决
	8, 渠道管理适应问题

# 0928

	1, 新增用户密码截取身份证后六位
	2, court类页的信息表格col row ,bug
	3, 中文用户名bug
	4, easyui ajax 0004 （ onLoadSuccess拦截 ）
	5, 合作解决权限不能选择父节点的父节点id问题
	6, 清除缓存后，菜单获取404，不会跳转登陆页面
	7, 浏览器解析html页面时候把head内容都解析到body内了，并在body顶部加了一个空行？？？解决：不知道谁把index.html的编码改变了

# 0929

	1, 表格适应后出现滚动条，表头错位5px问题，可以不显示纵向滚动条吗？设置除了最后一列宽度都+5px，最后一列-5px
		解决：
			1:去掉scrollbar的样式；
			2：<body class="easyui-layout">
			3: table包层data-options="region:'center'"
			4:datagrid{fit:true,fitCloumns:true,collapsible:true,toolbar:'#id',cloumn:[[{width:100}]]}
		*, 表格列和行有的时候没有同步宽高（)？
	2, 拦截功能
	3, 其他bug修复

# 0930

	1, 设置了datagrid的横向滚动条
	2, 待面审，电审的无法院执行的判断问题

# 1009

	1,errcode拦截问题，（返回数据格式优化后的改变）
	2,借款里的用户数据弹窗的popup处理
	3,金额统计美化
	4,借款各个页面顶部按钮的对齐美化
	5,待电审的逻辑更改
	6,用户管理的身份证验证，在新增和修改的不同状况下
	7,贷款申请的combo的美化
	8,用户管理的全选bug问题

# 1010

	1，借款
		* popup修改
		-1，贷款申请：（1）弹窗更换modal；（2）modal的表格换行处理；（3）住宅信息合并行；
		-2，待电审：（1）禁用已经保存过的选项的保存按钮
	2，系统管理
		-1，用户管理：（1）用户权限省份字段纠正；
	3，拦截处理：datagrid('getdata'),如果是空的话再去加载。。。
	4，网页加载问题
		-1，bootstrap.min.css转cdn（ https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css）
		-2，jq（https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js）
		-3，解决easyui的加载问题

# 1011

	1，用户管理修改时弹窗内城市显示
	2，用户的权限省市的存储利用，在选择搜索条件时
	3，立案的弹窗初始化清空表格操作
	4，研究easyui的datagrid加载拦截问题（找到onbeforerender事件）
	5，研究登出时候undefined问题（刷新接口显示canceled并弹出undefined，在连续刷新时候会出现此种情况）

# 1012

	1,研究登出时候undefined问题
		- 禁止logout的error的alert（登出的undefined，但根据下午偶尔出现的未授权，这个undefined出现在check_error中的可能性比较大）
		- 禁止findmenu的error的alert（大于两次的刷新时候的canceled出现undefined）
		- check_error的错误errorCode具体化
	2,
	4,微信的贷款，联系娇娇更改链接http://yibaba.com/Shouji/index.html
