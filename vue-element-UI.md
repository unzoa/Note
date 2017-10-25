# vue element UI

	# 创建一个基于 webpack 模板的新项目my-project
    $ sudo vue init webpack my-project
    # 进入项目目录
    $ cd my-project
    # 安装依赖，走你
    $ sudo npm install
    # 运行项目
    $ sudo npm run dev

    1，创建文件夹
    	api
    		／api.js
    	view
    		/activeManage
    			/page1
    			/page2
    		/activePublic
    			/page1
    			/page2
    	vuex
    		/index.js
    		/getters.js
    		/mutations.js
    		/actions.js

    2,sudo cnpm insatll vuex --save
    	配置vuex
    3,sudo cnpm i element-ui@1.0.9
    	配置ele
    	import Element from 'element-ui'
	    import 'element-ui/lib/theme-default/index.css'
	    Vue.use(Element)

    4,引入js文件，虚拟数据