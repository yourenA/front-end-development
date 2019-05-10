## Promise 是异步编程的一种解决方案
异步编程的传统解决方案是使用回调函数，这就容易产生回调函数层层嵌套的噩梦。而在ES6中使用Promise则可以避免这个问题。

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

Promise的构造函数接收一个函数参数，并且传入两个参数：resolve，reject。resolve，reject分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

**下面的这段代码使用Promise封装一个XHR请求**
```
<!DOCTYPE html>
<html>
<head>
    <meta content="text/html;charset=utf-8" http-equiv="Content-Type"/>
    <title>Promise</title>
    <script>
        const getJSON = function(url) {
            const promise = new Promise(function(resolve, reject){
                const handler = function() {
                    if (this.readyState !== 4) { //这里的this表示client XHR对象
                        return;
                    }
                    if (this.status === 200) {
                        resolve(this.response);
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                const client = new XMLHttpRequest();
                client.open("GET", url);
                client.onreadystatechange = handler;
                client.responseType = "json";
                client.setRequestHeader("Accept", "application/json");
                client.send();

            });

            return promise;
        };

        getJSON("/posts.json").then(function(json) { //resolve里面的参数
            console.log('Contents: ' + json);
        }, function(error) { //reject里面的参数
            console.error('出错了', error);
        });
    </script>
</head>
<body>
</body>
</html>
```
Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
```
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```
也可以使用catch()来捕获错误
```
promise.then(function(value) {
  // success
}).catch(function(error) {
  // failure
});
```

#### Promise 新建后就会立即执行
```
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
```
上面代码中，Promise新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本**所有同步任务执行完**才会执行，所以resolved最后输出。

#### Promise all并行执行异步操作

Promise的all方法提供了并行执行异步操作的能力，并且在**所有异步操作**执行完后才执行then回调。
Promise.all接收一个数组参数,all会把所有异步操作的结果放进一个数组中传给then

```
Promise
.all([async1(), async2(), async3()])
.then(function(results){
    console.log(results);//results数组的顺序与all中的顺序一致
});
```

文章参考自:[http://es6.ruanyifeng.com/#docs/promise](http://es6.ruanyifeng.com/#docs/promise)