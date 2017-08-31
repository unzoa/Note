本地后台地址http://192.168.2.24:81 帐号是it001 密码123456 192.168.2.24前端地址 帐号test 密码 123456

***************************************

**编辑-规格，商品规格管理**

	* 在表单第一栏目就可以增加新规格
	# func
	* 有两个以上属性的数组样式
	* 此种方法添加的样式，需要添加到现有的result数组中
	* 点击新增按钮，记录状态，判断是否添加到result
	* 多个属性，result中每条数组就多一组数据，只是属性字段值变了
	* 现在需要，添加公共字段值，添加新增属性值为一个数组添加到每个result数组中
	* 展开result数组，复制一组[0](需要先转成字符串，再转成对象),然后替换字段值，再插到每个result数组中

**商城轮播改渐隐，时间加长**

	* autoplay: 4000
	* 轮播方式，transform translate3d
	* effect:'fade'
	* 注释transform
	* 增加轮播接收数据api方法的块范围
	* 增加showImg()下，slidefunction，slideTo(index,duration,callback)

**帮助中心图片适应，显示**

	* mounted{获取图片原来尺寸，宽高比大于2为界限缩放}

**上传excel文件**

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

**商店选择商品，尺码对应的颜色值有问题**
	
	* 判断出了问题
	* 获取当前选中的属性返回值有问题

**权限问题**

	* user.vue data,options,权限>>>>>>>>>>>>
	* 接收接口数据展示>>>>>>>>>>>>>>>>>>
	* 菜单的选中状态显示：改checkbox为span显示>>>>>>>>>>>>>>
	* 发送选中id>>>>>>>>>>>>>>>>
	* 获取点击的用户id>>>>>>>>>>>>>>>
	* 点击变化事件，点击检查重复选择事件>>>>>>>>>>>>>>>>>>>
	* 各种按钮请求的接口>>>>>>>>>>
	* 样式修改>>>>>>>>>>>>
	* 点击非权限按钮，提示弹窗
		- 测试返回消息，非权限按钮返回消息
		- 几种按钮形式
			
			* panel中的保存按钮，更新按钮，operate()->sure()
			* 类panel的保存按钮
			* 直接confirm的确认按钮 .then( ()=>{} )
			* prompt？？

		- change places
		- api添加判断
			* response字段是否存在
			* ErrMsg
			* this.notice({msg:'',type:error})
			* code
				- import { mapActions } from 'vuex'
				- ...mapActions(['notice','judgeItemAction']),
				- 	
			        function judgeItem(item,apiname){
			            if(item.ErrCode){
			              that.notice({msg: '您没有此权限', type: 'error'})
			              that.$emit('close', {name: apiname})
			            }
			            if (item.responsecode) {
			              if (item.responsecode=='200') {
			                that.notice({msg:'保存成功',type:'success'})
			                that.$emit('close', {name: apiname})
			              }else{
			                that.notice({msg:item.responsetext,type:'error'})
			                that.$emit('close', {name: apiname})
			              }
			            }
			        }

				* /com/awaitpay
					(view-order-workorder)>>>>>>>>>>>>>>	 
				* /component/examine  
					（view-refund）(忘记)(退货审核)vchange.soback.approval
					（view-barter）vchange.sochange.approval 01170727000005
				* /com/workorderpanel 
					(view-workorder) vchange.woline.insert
					(忘记)(创建部门)vchange.dept.insert
				* /com/panel 
					(vie-part)
				* /comp/authnew
					update
				* /comp/edittable 
					(goods-sku)vchange.skuprop.update 保存
				* confirm
					(view-user)
					(view-sys-role)
					(view-sys-tenet)
					(view-sys-journal)
					(view-sys-category)
					(view-sys-stock)
					(view-sys-company)
					(view-sys-advertmanage)
					(view-sys-menu)
					(view-goods)
					(view-brand)
					(view-goods-catelogue)
					(view-goods-parameters)	
					(view-leaguer-insider)
					(view-sys-supplier)
					(view-logistics-enterstorage)
					(view-activity-auction)
					(view-orsers-advertisement)
				* 本组件内
					view-goods-basic
					view-packs-create
					view-purchase-banto
					comp/purchases/purachese
		- 直接在post方法内判断，添加store，vuex，noticeAction

**菜单加级别联动**

	* 主菜单》二级菜单
	* 权限加在了二级菜单上
	* child.list
	*-点击父级时候存储get内的id
	* 一个新的selecternew
	* vuex加状态
	*-index.js  add   state
	*-action,js   add
	*-mountation.js  add  export const increment = (state,value) => { state.count+=value}
	*-getter  add  export const count = state => state.count

**商城简体变繁体**

	* 引入jquery.s2t.js,依赖jquery.js
	* main.js 注册s2t
	* header.h 中引入s2t
	* 添加a按钮，require s2t 
		- login.html
		- register.html
		- header.html

**三端适应的登陆注册页面**

	* 首先是注册页面，
		- 手机号，获取验证码验证，首次密码，验证输入密码，直接登录的入口，注册成功后跳转
	* 登陆页面：
		- 直接手机号码+密码登陆
		- 手机验证码登陆方式，注册按钮
		- 登陆按钮

**商城商品详情选择属性联动**

    ** 取到的sele的valueid
    ** 因为这些值为定值，那么根据这几个值逐级排列匹配，选出不能匹配的n值
    ** 首先第一行不动
    ** 从第二行开始匹配
    ** 匹配内存在排列组合或者别的方法  比如 indexof

    ** 当前点击的id,如果联动无效，则active、跳转的联动有效的第一个，或者移除active
    ** 判断条件:如果thisId被存储了，则表示是可以联动的，反之
    ** flag

**功用商导入**
	
	** 添加按钮，组件，事件
	** 添加接口设置

**供应商-成本价管理**
	
	** 添加组件
	** 添加路由
	** 添加api接口
	** 创建菜单