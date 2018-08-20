### $(document).ready(function)
	* 当 DOM（文档对象模型） 已经加载，并且页面（包括图像）已经完全呈现时，会发生 ready 事件
	* onload 事件会在页面或图像加载完成后立即发生

### Dom
	Js
	创建新节点
		creatElement()
		creatTextNode()
	
	操作节点
		appendChild()
		removeChild()
		replaceChild()
		insertBefore()
	查找
		getElementsByTagName()
		getElementsByClassName()
		getElementsByName()
		getElementById()
		querySeletor()

	jQuery:
		append
		text
		html
		empty
		remove
		
		find('')
		children('')
		parentsUntil('')
		eq()
		siblings('')

### Ajax
	var xhr = new XHRHttpRquest();
	xhr.open('get',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status == 200){
			// do sth
		}
	}

### Promise
	var pro = new Promise((resolve,reject)=>{
			if(true){
				resolve(data)
			}else{
				reject(msg)
			}
		})
	pro.then((data)=>{

	}).catch((msg)=>{
		
	})

### Array
	* push
	* pop
	* shift // 把数组的第一个元素从其中删除
	* unshit // 向数组的开头添加一个或更多元素
	* concat // 连接数组
	* join // 数组变为字符串
	* slice(start,end) 
	* splice(index,count,new1,new2) // 替换原数组项目从index开始count个位置	
	* reverse
	* sort

	* arr.forEach( ()=>{} ) // 返回字符串，数组元素
	* arr.map( ()=>{ return } ) // 返回新的数组
	* filter(function(item){ return type item == 'number'}) // 返回过滤后的数组

### JSON
	* JSON.parse() 解析一个JSON字符串，构造由字符串描述的JavaScript值或对象
	* JSON.stringify()

### 模块化
	commonJs
		服务器端模块规范，一个文件是一个模块，例如Node.js
		同步加载，程序在所有模块都加载完毕后才执行
	amd
	cmd
