# CSS


## 响应式布局

### 1.meta标签

> [介绍](http://caibaojian.com/mobile-meta.html)


### 2.媒体查询


### 3.单位的使用

- rem: html设置font-size
- em: body设置font-size
	+ **文字缩进**：2em 就是两个文字
- 百分比 %
	```css
	html {font-size: 百分数; 百分数=自定义基数/浏览器默认字体}
	```


### 4.图片

1. 没必要**同时设置**宽、高，单独设置一个即可保持图片的原始比例

2. 同时设置了宽高，可以使用属性 object-fit，使图片在区域内适应。

```css
object-fit: cover; 属性值可自行决定
```


### 5.布局

1. 清除float

在父级直接添加：
```css
- overflow: hidden;
- 伪元素 :after { clear: both; }
```
2. display

- inline-block; 块级元素边行内元素
- flex [介绍](https://www.cnblogs.com/qingchunshiguang/p/8011103.html)
- grid [介绍](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Grid_Layout) | [详细](https://www.jianshu.com/p/41c038baf994)

3. margin-top

**使用%时，相对于父元素的width**

> CSS权威指南中的解释：若是相对于父元素的高度计算会形成死循环。
“我们认为，正常流中的大多数元素都会足够高以包含其后代元素（包括外边距），如果一个元素的上下外边距是父元素的height的百分数，就可能导致一个无限循环，父元素的height会增加，以适应后代元素上下外边距的增加，而相应的，上下外边距因为父元素height的增加也会增加，形成无限循环。”

> 还有一种说法是根本原因并不是因为死循环。例如zhangxinxu认为相对于 height 计算，大多数情况下计算值都是 0，跟摆设没什么 区别，还不如相对宽度计算，因为 CSS 默认的是水平流，计算值一直会有效，而且我们还可以 利用这一特性实现一些有意思的布局效果。也就是面向场景和需求设计，这种设计可以让我们轻松实现自适应的等比例矩形效果。

## 定位

 值 | 描述
:---|:---
static | 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
relative | 生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
absolute | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。 元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
fixed | 生成固定定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
sticky | 粘性定位，该定位基于用户滚动的位置。 它的行为就像 position:relative; 而当页面滚动超出目标区域时，它的表现就像 position:fixed;，它会固定在目标位置。 <br>`注意: Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix (查看以下实例)。`
inherit | 规定应该从父元素继承 position 属性的值。


## 动画属性

名称 | 属性
:---|:---
transform | translate、 rotate、 scale、 skew
transition | property <br> duration <br> timing-function <br> delay
animation | custom-name <br> duration <br> timing-function <br> delay <br>teration-count <br> direction:alternate <br>` @keyframes custom-name{from{}to{} or 0%{}100%{}}`

timing-function | 解释
:---|:---
linear | 规定以相同速度开始至结束的过渡效果（等于 cubic-bezier(0,0,1,1))
ease | 规定慢速开始，然后变快，然后慢速结束的过渡效果（cubic-bezier(0.25,0.1,0.25,1)）
ease-in | 规定以慢速开始的过渡效果（等于 cubic-bezier(0.42,0,1,1)）
ease-out | 规定以慢速结束的过渡效果（等于 cubic-bezier(0,0,0.58,1)）
ease-in-out | 规定以慢速开始和结束的过渡效果（等于 cubic-bezier(0.42,0,0.58,1)）
cubic-bezier(n,n,n,n) | 在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值


### 动画停留
```css
/*动画*/
.act-in{
	animation: act-in .5s ease;
	animation-fill-mode: forwards;
}
@keyframes act-in {
	0%{left: -50%;}
	100%{left: 0;}
}
.act-out{
	animation: act-out .5s ease;
	animation-fill-mode: forwards;
}
@keyframes act-out {
	0%{left: 0;}
	100%{left: -50%;}
}
/*动画结束*/
.actor-dancer {
	position: relative;
	left: -50%;
}
```


## 技巧


### 0.样式优先级

`!important>>行内>>页内>>link`

### 1.改变placeholder颜色

```css
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
```


### 2.加省略号

```html
<p class='h_news_title'>bala</p>
```

```css
.h_news_title {
	width: 55%;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
```


### 3.滚动条配置

```css
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
::-webkit-scrollbar {
	width: 16px;
	height: 16px;
	background-color: #F5F5F5;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
```


### 4.毛玻璃

```css
.frosted-glass {
	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-ms-filter: blur(5px);
	-o-filter: blur(5px);
	filter: blur(5px);
	filter: progid:DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
}
```


### 5.移动端

- 解决ios下样式不一样 -webkit-appearence:none;
- 解决ios移动端滑动动画问题 -webkit-overflow-scrolling:touch


### 6. padding 增加实际容器高度问题

**写padding之前，增加box-sizing: border-box;**


