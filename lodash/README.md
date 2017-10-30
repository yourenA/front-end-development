# lodash

如果仅需要 _.debounce 和 _.throttle 方法，可以使用 Lodash 的自定义构建工具，生成一个 2KB 的压缩库。
```
$ npm i -g lodash-cli
$ lodash include=debounce,throttle,find
```
可以直接引入生成的压缩文件，而不用引入全部