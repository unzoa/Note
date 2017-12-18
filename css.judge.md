/*1,position:
	relative
	absolute
	fixed
*/

/*2,percent
	rem
	width:auto
	width:calc();
	full window
*/

/*3,float:left;
	overflow:auto scroll;
	-webkit-overflow-scrolling:touch;
	clear:both;
	display:inline-block;
	display:flex;
	vertical-align:middle;
*/

/*4,-webkit-appearence:none;
*/

/*5,background:
	color
	image
	size
	position
	attachment
*/

/*6,transform:
	translate
	rotate
	scale
	skew
*/

/*7,transition
	property 
	duration 
	timing-function 
		linear	规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1)）。
		ease	规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）。
		ease-in	规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）。
		ease-out	规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）。
		ease-in-out	规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）。
		cubic-bezier(n,n,n,n)	在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。
	delay
*/

/*8,animation:
	custom-name
	duration
	timing-function
	delay
	teration-count 
	direction:alternate;

	@keyframes custom-name{
		from{}
		to{}
		0%{}
		100%{}
	}
*/

/*9,nth-child(n,2n,odd,even)
	first-child
	last-child
*/



**优先级**
	
	!important>>行内>>页内>>link

**毛玻璃**

	.frosted-glass{
	    -webkit-filter: blur(5px);
	    -moz-filter: blur(5px);
	    -ms-filter: blur(5px);
	    -o-filter: blur(5px);
	    filter: blur(5px);
	    filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
	}

**input-placeholder 改变placeholder颜色**

	::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	  	color: #fff!important;
	}
	:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	 	color: #fff!important;
	 	opacity: 1;
	}
	::-moz-placeholder { /* Mozilla Firefox 19+ */
	 	color: #fff!important;
	 	opacity: 1;
	}
	:-ms-input-placeholder { /* Internet Explorer 10-11 */
	 	color: #fff!important;
	}


**css当前行字段加省略号**

	<p class='h_news_title'>bala</p>
	.h_news_title {
	    width: 55%;
	    
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
	}

**滚动条**

	::-webkit-scrollbar {
	width: 0px;
	height: 1px;
	}
	::-webkit-scrollbar-thumb {
	border-radius: 5px;
	-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
	background: rgba(0, 0, 0, 0.2);
	} 

	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/  
	::-webkit-scrollbar  
	{  
	width: 16px;  
	height: 16px;  
	background-color: #F5F5F5;  
	}  

	/*定义滚动条轨道 内阴影+圆角*/  
	::-webkit-scrollbar-track  
	{  
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
	border-radius: 10px;  
	background-color: #F5F5F5;  
	}  

	/*定义滑块 内阴影+圆角*/  
	::-webkit-scrollbar-thumb  
	{  
	border-radius: 10px;  
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
	background-color: #555;  
	}  




