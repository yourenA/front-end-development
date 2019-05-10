### Doctype（文档类型）的作用是什么?
DOCTYPE是文档类型声明元素,它的作用是告诉xml解析器,将使用哪个dtd文件对此xml文档进行解析.

HTML 5 不基于 SGML，因此不需要对 DTD 进行引用，但是需要 doctype 来规范浏览器的行为（让浏览器按照它们应该的方式来运行）。

SGML是标准通用标记语言,简单的说，就是比HTML,XML更老的标准，这两者都是由SGML发展而来的。BUT，HTML5不是的。

### 浏览器的渲染过程
1. 首先获取html，然后构建dom树
2. 其次根据css构建render树，render树中不包含定位和几何信息
3. 最后构建布局数，布局是含有元素的定位和几何信息

### 利用manifest属性进行缓存缓存
首先给html标签添加manifest属性
```
<!DOCTYPE HTML>
<html manifest="demo.appcache">
<head>
    <title>文档标题</title>
</head>

<body>
文档内容......
</body>
</html>
```
demo.appcache格式如下
```
CACHE MANIFEST
  #v1.2
  CACHE :           //表示需要缓存的文件
    a.js
    b.js
NETWORK:    //表示只在用户在线的时候才需要的文件，不会缓存
  c.js
FALLBACK
/        /index.html     //表示如果找不到第一个资源就用第二个资源代替
```
### reset CSS 文件的作用和使用它的好处及弊端?
**作用：**

重置浏览器的默认样式

**好处：**
因为现在的浏览器很多，并且每个浏览器都有自己的默认样式，这样就会导致一个页面在多个浏览器下展示产生差异，所以我们需要做一些处理使每个浏览器下展示一致，故需要css reset

**弊端：**
并不是所有的标签都有默认的margin，padding，reset连有用的样式也干掉了

更好的替换者：Normalize.css 详细：http://jerryzou.com/posts/aboutNormalizeCss/

### 页面导入样式时，使用link和@import有什么区别？
* 区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
* 区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
* 区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
* 区别4：ink支持使用Javascript控制DOM去改变样式；而@import不支持。
### Label的作用是什么？是怎么用的？
label标签来定义表单控制间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。
```
<label for="Name">Number:</label> <input type=“text“name="Name" id="Name"/>
<label>Date:<input type="text" name="B" /></label>
```

### li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？
**原因**
浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格
**解决方法**

1. 将所有<写在同一行。不足：代码不美观。
2. 将\<ul>内的字符尺寸直接设为0，即font-size:0。不足：\<ul>中的其他字符尺寸也被设为0，需要额外重新设定其他字符尺寸，且在Safari浏览器依然会出现空白间隔。
3. 消除\<ul>的字符间隔letter-spacing:-8px，而这也设置了\<li>内的字符间隔，因此需要将\<li>内的字符间隔设为默认letter-spacing: normal。
### 不同的清除浮动的技巧
1. 使用空标签清除浮动
```
.clearfix { clear:both; }
```
2. 包含浮动元素的父标签添加css属性使用overflow
```
.container { overflow:auto; zoom:1;}
```
3. 使用after伪对象清除浮动
该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；content属性是必须的，但其值可以为空
```
.container:after { content:'';height:0;overflow:hidden;clear:both}
```
### 如何使用CSS sprites
CSS sprite即把网页中比较小的一些小图片整合到一张图片文件中，再利用CSS的background-image属性插入图片，然后利用background-position属性对图片所需要的部分进行精确定位，从而达到减少服务器请求次数的目的
```
.sp {background: url(00.png) no-repeat;}
.sp-1 {background-position: 0px 0px;}
.sp-2 {background-position: -26px 0px;}
.sp-3 {background-position: -26px -27px;}
.sp-4 {background-position: 0px -27px;}
```
### 使用媒体查询
**页面link元素中的CSS媒体查询**
```
<!-- link元素中的CSS媒体查询 -->
<link rel="stylesheet" media="(max-width: 800px)" href="example.css"/>
```
**css样式中使用媒体查询**
```
@media screen and (min-width:960px) and (max-width:1200px){
    body{
        background:yellow;
    }
}
```