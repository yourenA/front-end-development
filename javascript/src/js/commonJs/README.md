# CommonJS

>CommonJS 不是一个 JavaScript 库。它是一个标准化组织。它就像 ECMA 或 W3C 一样。

CommonJS不能在浏览器端直接使用，需要使用到browserify

## Browserify 是目前最常用的 CommonJS 格式转换的工具
Browserify 是一个 模块打包器(module bundler)

```
$ npm install -g browserify

$  browserify main.js -o bundle.js
```

>CommonJS规范加载模块是**同步**的，也就是说，只有加载完成，才能执行后面的操作。**AMD规范则是非同步加载模块**，允许**指定回调函数**。由于Node.js主要用于服务器编程，模块文件一般都已经存在于本地硬盘，所以加载起来比较快，不用考虑非同步加载的方式，所以CommonJS规范比较适用。但是，如果是浏览器环境，要从服务器端加载模块，这时就必须采用非同步模式，因此浏览器端一般采用AMD规范。

