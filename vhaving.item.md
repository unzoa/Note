本地后台地址http://192.168.2.24:81 帐号是it001 密码123456 192.168.2.24前端地址 帐号test 密码 123456

**刘一尊**1，广告位：搜索单号，查询广告位
* 传递参数，后台返回数据

**张炎**3，商品目录：选择商品分类跳转到相应分类
* 并没有分类页面？？

**唐茹**7，前台，下架产品不显示空白，要显示已经下架
* 输出内容判断

**张炎**11，上下架
* 从编辑下架的提交按钮，返回接口判断是否弹窗提示

**刘一尊**12，导出商品
* excel

**牛俊杰**13，重量
* 判断

***
**unre**8，搜索栏
* 后端增加模糊

**unre**14，参数管理
* 添加删除按钮，加事件

**unre**2，后端页面路由返回,返回按钮
* 商品列表编辑时，弹窗的消失，组织组件路由回到第一页

**unre**4，保存商品时，点击后只保存一次
* 计数方法，退出panel后计数归0

**null**6，有规格产品识别价格最高
* ？？？
* 后端加字段：最高价格

**unre**9，商品导入，重量导入
* ？？？




***************************************
**yhy**5，编辑-规格，商品规格管理
* 在表单第一栏目就可以增加新规格
# func
* 有两个以上属性的数组样式
* 此种方法添加的样式，需要添加到现有的result数组中
* 点击新增按钮，记录状态，判断是否添加到result
* 多个属性，result中每条数组就多一组数据，只是属性字段值变了
* 现在需要，添加公共字段值，添加新增属性值为一个数组添加到每个result数组中
* 展开result数组，复制一组[0](需要先转成字符串，再转成对象),然后替换字段值，再插到每个result数组中

**yhy** 商城轮播改渐隐，时间加长
* autoplay: 4000
* 轮播方式，transform translate3d
* effect:'fade'
* 注释transform
* 增加轮播接收数据api方法的块范围
* 增加showImg()下，slidefunction，slideTo(index,duration,callback)

**yhy** 帮助中心图片适应，显示
* mounted{获取图片原来尺寸，宽高比大于2为界限缩放}

**yhy** 上传excel文件
* vchange.item.excel
* 传excel文件？？？
* input file获取文件
* @change="change"
* 显示本地路径  input file js 获取路径   XXXXXX
* sheet.js 获取到了json数据  VVVVV
**editPart
* index.html add xlsx.js
* goods.vue template add button>input
* data add inputChangeExcel:''
* methods add change() fixdata()