# webAPP入门最佳实践

## meta
* H5页面窗口自动调整到设备宽度，并禁止用户缩放页面
```
<meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
```
* 忽略将页面中的数字识别为电话号码
```
<meta name="format-detection" content="telephone=no" />
```
* 忽略Android平台中对邮箱地址的识别
```
<meta name="format-detection" content="email=no" />
```
* 允许全屏
```
"添加到主屏幕“后，全屏显示 <meta name="apple-mobile-web-app-capable" content="yes" />
这meta的作用就是删除默认的苹果工具栏和菜单栏。content有两个值”yes”和”no”,当我们需要显示工具栏和菜单栏时，这个行meta就不用加了，默认就是显示。
<!-- ios7.0版本以后，safari上已看不到效果 -->
```
* 将网站添加到主屏幕快速启动方式，仅针对ios的safari顶端状态条的样式
```
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
<!-- 可选default、black、black-translucent -->
```
* 禁止百度转码
```
<meta http-equiv="Cache-Control" content="no-siteapp">
```
* 添加到主屏后的APP图标
```
<!-- 设计原图 -->
 <link href="short_cut_114x114.png" rel="apple-touch-icon-precomposed"> 
<!-- 添加高光效果 -->
 <link rel="apple-touch-icon" href="touch-icon-iphone.png">
 <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
 <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
 <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
```
viewport模板
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>标题</title>
<link rel="stylesheet" href="index.css">
</head>

<body>
这里开始内容
</body>
</html>
```


## 动态设置HTML的字号
```
<script>
    var iWidth = document.documentElement.clientWidth;
    document.getElementsByTagName("html")[0].style.fontSize = iWidth / 3 + "px";
</script>
```
使用rem进行设置宽高

## 移动端如何定义字体font-family
各个手机系统有自己的默认字体，且都不支持微软雅黑
如无特殊需求，手机端无需定义中文字体，使用系统默认
英文字体和数字字体可使用 Helvetica ，三种系统都支持

//简单版
中文字体使用系统默认即可，英文用Helvetica
````
   /* 移动端定义字体的代码 */
   body{font-family:Helvetica;}
````

//升级版
```
body {
    font-family: -apple-system, BlinkMacSystemFont, "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;

}
```
iOS 4.0+ （iOS 9以下系统已经非常少） 使用英文字体 Helvetica Neue，之前的iOS版本降级使用 Helvetica。 中文字体设置为华文黑体STHeiTi。

iOS 9+ Safari开始支持 -apple-system 参数， Chrome 使用 BlinkMacSystemFont ，兼容 iOS ／ MacOS

微软雅黑是为了兼容Win系统，毕竟视网膜分辨率的win系统用Simsun是非常丑陋的。


## 移动端字体单位font-size选择px还是rem
对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可
对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备
rem配置参考，适合视觉稿宽度为640px的：
```
html{font-size:10px}
@media screen and (min-width:321px) and (max-width:375px){html{font-size:11px}}
@media screen and (min-width:376px) and (max-width:414px){html{font-size:12px}}
@media screen and (min-width:415px) and (max-width:639px){html{font-size:15px}}
@media screen and (min-width:640px) and (max-width:719px){html{font-size:20px}}
@media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px}}
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px}}
@media screen and (min-width:800px){html{font-size:25px}}
```

## 响应式布局(媒体查询)
>如果要在移动端使用媒体,需要添加移动端的meta,否者不起作用

* 在样式中使用media
```
<style>
        body {
            background-color: #cccccc;
        }
        @media only screen and (max-width: 720px) and (min-width: 320px) {//左开右闭区间(包括720px,不包括320px)
            body {
                background-color: red;
            }
        }
        @media only screen and (max-width: 320px) {
            body {
                background-color: blue;
            }

        }
    </style>
```
我们用min-width时，小的放上面大的在下面，同理如果是用max-width那么就是大的在上面，小的在下面

* 直接在link中判断设备的尺寸，然后引用不同的css文件：

```<link rel="stylesheet" type="text/css" href="styleA.css" media="screen and (min-width: 400px)">包括400px```


## 移动端touch事件
当用户手指放在移动设备在屏幕上滑动会触发的touch事件

以下支持webkit

* touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指
* touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动
* touchend——当手指离开屏幕时触发
* touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用
> 使用addEventLister添加事件才起作用，直接使用DOM0级事件会不起作用
```
el.addEventListener(eventType, function () {
}, false);
该方法应用至dom节点
第一个参数为事件名
第二个为事件处理程序
第三个为布尔值，true便是事件捕获，false为事件冒泡
```

TouchEvent

* touches：屏幕上所有手指的信息
* targetTouches：手指在目标区域的手指信息
* changedTouches：最近一次触发该事件的手指信息
* touchend时，touches与targetTouches信息会被删除，changedTouches保存的最后一次的信息，最好用于计算手指信息
参数信息(changedTouches[0])

clientX、clientY在显示区的坐标
target：当前元素

## 移动端click屏幕产生200-300 ms的延迟响应
移动设备上的web网页是有300ms延迟的，往往会造成按钮点击延迟甚至是点击失效。
解决方案：

* fastclick可以解决在手机上点击事件的300ms延迟
* zepto的touch模块，tap事件也是为了解决在click的延迟问题

触摸事件的响应顺序
1. ontouchstart 
2. ontouchmove 
3. ontouchend 
4. onclick
解决300ms延迟的问题，也可以通过绑定ontouchstart事件，加快对事件的响应

## 什么是Retina 显示屏，带来了什么问题
retina：一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个
在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的**2倍**
那么，前端的应对方案是：
设计稿切出来的图片长宽保证为偶数，并使用**backgroud-size把图片缩小为原来的1/2**
```
//例如设计图图片宽高为：200px*200px，那么写法如下
.css{width:100px;height:100px;background-size:100px 100px;}
```
其它元素的取值为原来的1/2，例如**视觉稿40px的字体**，使用样式的**写法为20px**
```
.css{font-size:20px}
```

简单介绍下 devicePixelRatio ，它是设备上物理像素和设备独立像素( device-independent pixels (dips) )的比例，即 devicePixelRatio = 屏幕物理像素/设备独立像素 
例如iPhone4S，分辨率为：960×640，取屏幕宽度计算，物理像素640px，设备独立像素320px，那么，devicePixelRatio 值为 640px / 320px = 2，又如iPhone3，计算出来的 devicePixelRatio 值为 320px / 320px = 1
那么，通过计算 devicePixelRatio 的值，是可以区分普通显示屏和高清显示器，当devicePixelRatio值等于1时（也就是最小值），那么它普通显示屏，当devicePixelRatio值大于1(通常是1.5、2.0)，那么它就是高清显示屏

通过判断 devicePixelRatio 的值来加载不同尺寸的图片
1. 针对普通显示屏(devicePixelRatio = 1.0、1.3)，加载一张1倍的图片
2. 针对高清显示屏(devicePixelRatio >= 1.5、2.0、3.0)，加载一张2倍大的图片

**-webkit-min-device-pixel-ratio**
```
.css{/* 普通显示屏(设备像素比例小于等于1.3)使用1倍的图 */ 
    background-image: url(img_1x.png);
}
@media only screen and (-webkit-min-device-pixel-ratio:1.5){
.css{/* 高清显示屏(设备像素比例大于等于1.5)使用2倍图  */
    background-image: url(img_2x.png);
  }
}
```

## ios系统中元素被触摸时产生的半透明灰色遮罩怎么去掉
## 部分android系统中元素被点击时产生的边框(遮罩)怎么去掉
android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置-webkit-tap-highlight-color的alpha值为0去除部分机器自带的效果
**-webkit-tap-highlight-color**
```
a,button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0;)
}
```

###webkit表单元素的默认外观怎么重置
1. 通用
**appearance**
```
.css{-webkit-appearance:none;appearance:none; }
```
2. 伪元素改变number类型input框的默认样式
```
input[type=number]::-webkit-textfield-decoration-container {
    background-color: transparent;    
}
input[type=number]::-webkit-inner-spin-button {
     -webkit-appearance: none;
}
input[type=number]::-webkit-outer-spin-button {
     -webkit-appearance: none;
}
```
3. webkit表单输入框placeholder的颜色值能改变么
**-webkit-input-placeholder**
```
input::-webkit-input-placeholder{color:#AAAAAA;}
input:focus::-webkit-input-placeholder{color:#EEEEEE;}
```

## 打电话发短信写邮件怎么实现
打电话```<a href="tel:0755-10086">打电话给:0755-10086</a>```
发短信，winphone系统无效```<a href="sms:10086">发短信给: 10086</a>```
写邮件```<a href="mailto:peun@foxmail.com">peun@foxmail.com</a>```

## 模拟按钮hover效果
移动端触摸按钮的效果，可明示用户有些事情正要发生，是一个比较好体验，但是移动设备中并没有鼠标指针，使用css的hover并不能满足我们的需求，还好国外有个激活移动端css的active效果。
直接在body上添加ontouchstart，同样可**激活移动端css的active效果**，比较推荐这种方式，代码如下：
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
.btn-blue:active{background-color: #357AE8;}
</style>
</head>
<body ontouchstart>
<div class="btn-blue">按钮</div>
//或者设置
//<script type="text/javascript">
//document.addEventListener("touchstart", function(){}, true)
//</script>
</body>
</html>
```

要做到全兼容的办法，可通过绑定ontouchstart和ontouchend来控制按钮的类名
```
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<style type="text/css">
a{-webkit-tap-highlight-color: rgba(0,0,0,0);}
.btn-blue{display:block;height:42px;line-height:42px;text-align:center;border-radius:4px;font-size:18px;color:#FFFFFF;background-color: #4185F3;}
.btn-blue-on{background-color: #357AE8;}
</style>
</head>
<body>

<div class="btn-blue">按钮</div>

<script type="text/javascript">
var btnBlue = document.querySelector(".btn-blue");
btnBlue.ontouchstart = function(){
    this.className = "btn-blue btn-blue-on"
}
btnBlue.ontouchend = function(){
    this.className = "btn-blue"
}
</script>
</body>
</html>
```

## 屏幕旋转的事件和样式
**onorientationchange,window.orientation**
```
window.onorientationchange = function(){
    switch(window.orientation){
        case -90:
        case 90:
        alert("横屏:" + window.orientation);
        case 0:
        case 180:
        alert("竖屏:" + window.orientation);
        break;
    }
}
```
```
//竖屏时使用的样式
@media all and (orientation:portrait) {
.css{}
}

//横屏时使用的样式
@media all and (orientation:landscape) {
.css{}
}
```

## audio元素和video元素在ios和andriod中无法自动播放
   应对方案：触屏即播
   ```
   $('html').one('touchstart',function(){
       audio.play()
   })
   ```
   
## 手机拍照和上传图片
**type=file accep=""**
   ```
   <!-- 选择照片 -->
   <input type=file accept="image/*">
   <!-- 选择视频 -->
   <input type=file accept="video/*">
   ```
   使用总结：
   *  ios 有拍照、录像、选取本地图片功能
   * 部分android只有选取本地图片功能
   * winphone不支持
   * input控件默认外观丑陋

## 开启硬件加速
**transform: translate3d(0, 0, 0)**
   解决页面闪白
   保证动画流畅
```
.css {
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}
```

## JS动态改变HTML的fontSize并且动态生成meta标签
```
<script>
    (function (doc, win) {
        // 分辨率Resolution适配
        var docEl = doc.documentElement;//document根标签
        var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';//判断事件类型
        var recalc=function() { //事件回调
            var clientWidth = docEl.clientWidth;//document的宽度
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 320) + 'px'; //改变document（既HTML标签）的fontSize字号
        };
        /*监听事件*/
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);//DOMContentLoaded类型与jquery的ready

        // 一物理像素在不同屏幕的显示效果不一样。要根据devicePixelRatio来修改meta标签的scale,要注释上面的meta标签
        (function () {
            var dpr = scale = 1;//将dpr与缩放比例都初始化为1
            var isIPhone = win.navigator.appVersion.match(/iphone/gi);//判断是否是iphone
            console.log( win.navigator.appVersion);
            var devicePixelRatio = win.devicePixelRatio;
            console.log("devicePixelRatio", devicePixelRatio);
            console.log("isIPhone",isIPhone);
            if (isIPhone) {
                // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
                if (devicePixelRatio >= 3 ) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 ) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                // 其他设备下，仍旧使用1倍的方案
                dpr = 1;
            }
            /*页面缩放比例*/
            scale = 1 / dpr;

            //动态添加meta标签
            var metaEl = "";
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
            console.log(docEl.firstElementChild);

            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        })();

    })(document, window);
</script>

```

## 实现1px的边框
推荐使用**transform：scale（0.5）**
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .border-1px {
            width: 100%;
            height: 100px;
            position: relative;
        }
        .border-1px:after {
            position: absolute;
            content: '';
            top: -50%;//要添加-50%
            bottom: -50%;
            left: -50%;
            right: -50%;
            -webkit-transform: scale(0.5);
            transform: scale(0.5);
            border: 1px solid #666;
        }
    </style>
</head>
<body>
<div class="border-1px"></div>
</body>
</html>
```

也可以使用border-image
```
.border-image-1px {
    border-width: 1px 0px;
    -webkit-border-image: url("border.png") 2 0 stretch;
    border-image: url("border.png") 2 0 stretch;
}
```

###实现背景图高清化
* media query
目前兼容性最好的背景图高清化实现方式，使用mediaquery的**webkit-min-device-pixel-ratio**做判断：
```
/* 普通显示屏(设备像素比例小于等于1)使用1倍的图 */
        .css{
            background-image: url(img_1x.png);
        }
 
        /* 高清显示屏(设备像素比例大于等于2)使用2倍图  */
        @media only screen and (-webkit-min-device-pixel-ratio:2){
            .css{
                background-image: url(img_2x.png);
            }
        }
 
        /* 高清显示屏(设备像素比例大于等于3)使用3倍图  */
        @media only screen and (-webkit-min-device-pixel-ratio:3){
            .css{
                background-image: url(img_3x.png);
            }
        }
```
* background: image-set
```
.css{
  background-image: url(no-image-set.png);
  background: image-set(url(foo-lowres.png) 1x,url(foo-highres.png) 2x) center;
}
```
1. 不支持image-set：在不支持image-set的浏览器下，他会支持background-image图像，也就是说不支持image-set的浏览器下，他们解析background-image中的背景图像；
2. 支持image-set：如果你的浏览器支持image-sete，而且是普通显屏下，此时浏览器会选择image-set中的@1x背景图像；
3. Retina屏幕下的image-set：如果你的浏览器支持image-set，而且是在Retina屏幕下，此时浏览器会选择image-set中的@2x背景图像。

## 判断移动端是android还是iphone
1、通过判断浏览器的userAgent，用正则来判断是否是ios和Android客户端。代码如下：
```
var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
alert('是否是Android：'+isAndroid);
alert('是否是iOS：'+isiOS);
```
2、下面一个比较全面的浏览器检查函数，提供更多的检查内容，你可以检查是否是移动端（Mobile）、ipad、iphone、微信、QQ等。代码如下：
```
//判断访问终端
var browser={
    versions:function(){
        var u = navigator.userAgent, app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
```
使用方法：
```
//判断是否IE内核
if(browser.versions.trident){ 
alert("is IE"); 
}
//判断是否webKit内核
if(browser.versions.webKit){ 
alert("is webKit"); 
}
//判断是否移动端
if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ 
alert("移动端"); 
}
```