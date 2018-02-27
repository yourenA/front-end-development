# node-call-dll

## 安装必须的软件

1. nodejs
>需要全局安装node-gyp 

2. python-2.7.13
>不支持3.0以上python，安装的时候要勾选将python添加到系统路径PATH

3. Visual C++ Build Tools 
>自定义安装，选择自己的系统sdk,win10系统要选择win8 sdk和win10 sdk 

出现node-gyp:build错误需要在命令行设置```npm config set msvs_version 2015 --global```

## 将 .c 文件打包为dll

运行Visual C++ Build Tools安装的```Visual C++ 2015 x64 Native Build Tools Command Prompt```
在命令行中进入 .c 文件所在目录，执行
```
$ cl.exe /D_USRDLL /D_WINDLL factorial.c /link /DLL /OUT:product.dll
```
* test.c : 需要转换的.c文件
* product.dll : 需要转成的dll文件

> 需要使用32位还是64位的Native Build Tools Command Prompt 要根据 nodejs 来选择，如果nodejs 是32位，则需要使用 Visual C++ 2015 x86 Native Build Tools Command Prompt

## 使用ffi在node环境中调用dll

* app.js
```
const ffi = require('ffi');
let product = ffi.Library('./product', {
    'factorial': ['uint64', ['int']],
    'add': ['int', ['int', 'int']],
    'minus': ['int', ['int', 'int']],
    'multiply': ['int', ['int', 'int']],
    'compare': ['string', ['int', 'int']]
});

product.add(first, second);//调用
```
ffi.Library(dll文件路径,{'dll文件中的某一个方法':['方法类型',['参数类型'...]]})

* factorial.c
```
EXPORT int add(int first,int second) {
  int result = first+second;
  return result;
}
```
