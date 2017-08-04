# React-native

0.43

>* 真机调试要把/android/build.gradle中的2.2.3改为1.2.3和把/android/gradle/wrapper/gradle-wrapper.properties中的gradle-2.14.1-all.zip改为gradle-2.2-all.zip
>* 电脑调试要把/android/build.gradle中的1.2.3改为2.2.3和把/android/gradle/wrapper/gradle-wrapper.properties中的gradle-2.2-all.zip改为gradle-2.14.1-all.zip
>* 更改后重新yarn
>* 如果打包后不现实图片，先在根目录执行：react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
>* 值得注意的是：我们在开发一个apk发布在应用商店时，需要我们自己的生成的签名文件，这个签名文件和开发环境默认的签名文件肯定是不同的，至少指纹证书SHA1就不同。所以，当我们通过我们自己生成的签名文件导出签名的apk时，百度地图的key应该是我们自己的签名文件中的指纹证书，如果还是用的是debug.keystore的SHA1申请的key,百度地图自然就会有问题。比如，我们导出apk的签名文件名字为myapp.keystore;那么可以通过在命令窗口中输入keytool -list -v -keystore myapp.keystore得到SHA1，然后通过这个SHA1去申请百度key，这样，你导出的签名apk的百度地图功能就不会只显示方格图加载不出来地图的问题了。


## 全局安装react-native-cli 
```
$ npm install -g  react-native-cli
$ react-native init AwesomeProject 初始化项目
$ react-native run-android  运行项目，要先运行虚拟机或者连接设备
```

### 程序入口

```
import React, { Component } from 'react'; //依赖react
import { AppRegistry, StyleSheet, Text, View } from 'react-native'; //引用react-nativez注册，样式定义和组件

AppRegistry.registerComponent()
StyleSheet.create({})
```
AppRegistry.registerComponent这个方法一般只会调用一次

app注册.注册组件(组件名，引用组件回调)
```AppRegistry.registerComponent('AwesomeProject2', () => AwesomeProject2);```

### 样式

```
//使用
 <Text style={styles.red}>just red</Text>//单个样式在{}
 <Text style={[styles.bigblue, styles.red]}>bigblue, then red</Text>//多个样式在{[]}
 
//定义
const styles = StyleSheet.create({
  bigblue: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});
```

>React Native中的尺寸都是无单位的，表示的是与设备像素密度无关的逻辑像素点。

**flex布局**
```
// 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'powderblue'}} />
        <View style={{flex: 2, backgroundColor: 'skyblue'}} />
        <View style={{flex: 3, backgroundColor: 'steelblue'}} />
      </View>

```
>flex主轴为垂直方向，flex: 1代表所占高度

### 使用Flexbox布局
>React Native中的Flexbox的工作原理和web上的CSS基本一致，当然也存在少许差异。首先是默认值不同：flexDirection的默认值是column而不是row，而flex也只能指定一个数字值。

**Flex Direction**
在组件的style中指定flexDirection可以决定布局的主轴。默认值是竖直轴(column)方向。

**Justify Content**
在组件的style中指定justifyContent可以决定其子元素沿着主轴的排列方式。

**Align Items**
在组件的style中指定alignItems可以决定其子元素沿着次轴（与主轴垂直的轴，比如若主轴方向为row，则次轴方向为column）的排列方式。

### 处理文本输入TextInput
TextInput是一个允许用户输入文本的基础组件。它有一个名为onChangeText的属性，此属性接受一个函数，而此函数会在文本变化时被调用。另外还有一个名为onSubmitEditing的属性，会在文本被提交后（用户按下软键盘上的提交键）调用。

### 如何使用ScrollView
ScrollView是一个通用的可滚动的容器，你可以在其中放入多个组件和视图，而且这些组件并不需要是同类型的。ScrollView不仅可以垂直滚动，还能水平滚动（通过horizontal属性来设置）。
>ScrollView适合用来显示数量不多的滚动元素。放置在ScollView中的所有组件都会被渲染，哪怕有些组件因为内容太长被挤出了屏幕外。如果你需要显示较长的滚动列表，那么应该使用功能差不多但性能更好的ListView组件。

### 如何使用ListView
ListView组件用于显示一个垂直的滚动列表，其中的元素之间结构近似而仅数据不同。

ListView更适于长列表数据，且元素个数可以增删。和ScrollView不同的是，ListView并不立即渲染所有元素，而是**优先渲染屏幕上可见的元素**。

ListView组件必须的两个属性是dataSource和renderRow。dataSource是列表的数据源，而renderRow则逐个解析数据源中的数据，然后返回一个设定好格式的组件来渲染。

### 引用图片
```<Image source={require('./img/check.png')} />```
>注意：为了使新的图片资源机制正常工作，require中的图片名字必须是一个静态字符串。
```
// 正确
<Image source={require('./my-icon.png')} />

// 错误
var icon = this.props.active ? 'my-icon-active' : 'my-icon-inactive';
<Image source={require('./' + icon + '.png')} />

// 正确
var icon = this.props.active ? require('./my-icon-active.png') : require('./my-icon-inactive.png');
<Image source={icon} />
```
网络图片
很多要在App中显示的图片并不能在编译的时候获得，又或者有时候需要动态载入来减少打包后的二进制文件的大小。这些时候，与静态资源不同的是，你需要**手动指定图片的尺寸**。
```
// 正确
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
       style={{width: 400, height: 400}} />

// 错误
<Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />
```
通过嵌套来实现背景图片
```
return (
  <Image source={...}>
    <Text>Inside</Text>
  </Image>
);
```


###使用Fetch
```
fetch('https://mywebsite.com/endpoint/', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstParam: 'yourValue',
    secondParam: 'yourOtherValue',
  })
})
```
使用promise响应请求，也可以在React Native应用中使用ES7标准中的async/await 语法
>React Native中已经内置了XMLHttpRequest API(也就是俗称的ajax)。一些基于XMLHttpRequest封装的第三方库也可以使用，例如frisbee或是axios等。但注意不能使用jQuery，因为jQuery中还使用了很多浏览器中才有而RN中没有的东西（所以也不是所有web中的ajax库都可以直接使用）。
>需要注意的是，安全机制与网页环境有所不同：在应用中你可以访问任何网站，没有跨域的限制。

### WebSocket支持
```
var ws = new WebSocket('ws://host.com/path');

ws.onopen = () => {
  // 打开一个连接

  ws.send('something'); // 发送一个消息
};

ws.onmessage = (e) => {
  // 接收到了一个消息
  console.log(e.data);
};

ws.onerror = (e) => {
  // 发生了一个错误
  console.log(e.message);
};

ws.onclose = (e) => {
  // 连接被关闭了
  console.log(e.code, e.reason);
};
```

### 使用Navigator
首先要做的是渲染一个Navigator组件，然后通过此组件的renderScene属性方法来渲染其他场景。
```
render() {
  return (
    <Navigator
      initialRoute={{ title: 'My Initial Scene', index: 0 }}
      renderScene={(route, navigator) => {
        return <MyScene title={route.title} />
      }}
    />
  );
}
```

要过渡到新的场景，你需要了解push和pop方法。这两个方法由navigator对象提供，而这个对象就是上面的renderScene方法中传递的第二个参数。 我们使用这两个方法来把路由对象推入或弹出导航栈。
```
navigator.push({
  title: 'Next Scene',
  index: 1,
});

navigator.pop();
```

### 处理触摸事件
在需要捕捉用户点击操作时，可以使用"Touchable"开头的一系列组件。这些组件通过onPress属性接受一个点击事件的处理函数。当一个点击操作开始并且终止于本组件时（即在本组件上按下手指并且抬起手指时也没有移开到组件外），此函数会被调用。
```
<TouchableHighlight onPress={this._onPressButton}>
   <Text>Button</Text>
</TouchableHighlight>
```
具体使用哪种组件，取决于你希望给用户什么样的视觉反馈：

一般来说，你可以使用TouchableHighlight来制作按钮或者链接。注意此组件的背景会在用户手指按下时**变暗**。

在Android上还可以使用TouchableNativeFeedback，它会在用户手指按下时形成类似**墨水涟漪**的视觉效果。

TouchableOpacity会在用户手指按下时降低按钮的**透明度**，而不会改变背景的颜色。

如果你想在处理点击事件的同时**不显示**任何视觉反馈，则需要使用TouchableWithoutFeedback。

长按
某些场景中你可能需要检测用户是否进行了长按操作。可以在上面列出的任意组件中使用onLongPress属性来实现。

ScrollView可以在垂直或水平方向滚动，还可以配置**pagingEnabled**属性来让用户整屏**整屏的滑动**。此外，**水平方向的滑动**还可以使用Android上的**ViewPagerAndroid** 组件。
