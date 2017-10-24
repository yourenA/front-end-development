# 异步模块定义(AMD) 

格式
```
define([‘add’, ‘reduce’], function(add, reduce){ //回调函数中的参数要与数组中的元素名称顺序一致
  return function(){...};
});
```

## RequireJS
RequireJS 是一个 JavaScript 模块加载器(module loader) 。它可以根据需要异步加载模块。

>尽管 RequireJS 的名字中含有 require，但是它的目标却并非要去支持 CommonJS 的 require 语法。使用 RequireJS，您可以编写 AMD 风格的模块。

```
<script data-main=”main” src=”require.js”></script>  
```
* data-main为入口js文件路径

缺点
* AMD 的语法过于冗余。因为所有东西都封装在 define 函数中
* 在当前浏览器下（HTTP 1.1），加载很多小文件会降低性能。