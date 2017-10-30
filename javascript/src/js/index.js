// debounce函数用来包裹我们的事件
function debounce(fn, delay) {
    // 持久化一个定时器 timer
    let timer = null;
    // 闭包函数可以访问 timer
    return function() {
        // 通过 'this' 和 'arguments'
        // 获得函数的作用域和参数
        let context = this;
        let args = arguments;
        console.log(args)
        // 如果事件被触发，清除 timer 并重新开始计时
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}
// 当用户滚动时函数会被调用
function foo() {
    console.log('You are scrolling!');
}

// 在事件触发的两秒后，我们包裹在debounce中的函数才会被触发
document.addEventListener('scroll', debounce(foo, 500));