# gulp

```
$ npm install -g gulp
$ npm init
$ npm install gulp --save-dev  
```

## 常用插件

* babel = require("gulp-babel") 编译es6
* sass = require('gulp-ruby-sass') 编译sass 
>注意使用gulp-ruby-sass不能又中文路径，即使是父文件也不能有中文路径，否则不能动态刷新
>
>$ gulp
>
>[18:21:33] Using gulpfile E:\front-end-development\gulp\gulpfile.js这里的路径不能有中文
* postcss = require('gulp-postcss')与autoprefixer = require('autoprefixer'), 自动添加css前缀
* uglify=require('gulp-uglify') 混淆js代码
* nano = require('gulp-cssnano') 混淆css代码
* rename = require('gulp-rename') 重命名文件
* imagemin = require('gulp-imagemin') 压缩图片
* concat  = require('gulp-concat') 合并js文件
* sourcemaps = require('gulp-sourcemaps') 文件映射
* clean = require('gulp-clean') 清除文件
* browserSync = require('browser-sync') 开启前端服务器，自动刷新

## gulp命令
```
gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数

gulp.run(tasks...)：尽可能多的并行运行多个task

gulp.watch(glob, fn)：当glob内容发生改变时，执行fn

gulp.src(glob)：置需要处理的文件的路径，可以是多个文件以数组的形式，也可以是正则

gulp.dest(path[, options])：设置生成文件的路径
```