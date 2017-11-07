'use strict';

// debounce函数用来包裹我们的事件
function debounce(fn, delay) {
    // 持久化一个定时器 timer
    var timer = null;
    // 闭包函数可以访问 timer
    return function () {
        // 通过 'this' 和 'arguments'
        // 获得函数的作用域和参数
        var context = this;
        var args = arguments;
        console.log(args);
        // 如果事件被触发，清除 timer 并重新开始计时
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}
// 当用户滚动时函数会被调用
function foo() {
    console.log('You are scrolling!');
}

// 在事件触发的两秒后，我们包裹在debounce中的函数才会被触发
document.addEventListener('scroll', debounce(foo, 500));
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImRlYm91bmNlIiwiZm4iLCJkZWxheSIsInRpbWVyIiwiY29udGV4dCIsImFyZ3MiLCJhcmd1bWVudHMiLCJjb25zb2xlIiwibG9nIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImFwcGx5IiwiZm9vIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsU0FBU0EsUUFBVCxDQUFrQkMsRUFBbEIsRUFBc0JDLEtBQXRCLEVBQTZCO0FBQ3pCO0FBQ0EsUUFBSUMsUUFBUSxJQUFaO0FBQ0E7QUFDQSxXQUFPLFlBQVc7QUFDZDtBQUNBO0FBQ0EsWUFBSUMsVUFBVSxJQUFkO0FBQ0EsWUFBSUMsT0FBT0MsU0FBWDtBQUNBQyxnQkFBUUMsR0FBUixDQUFZSCxJQUFaO0FBQ0E7QUFDQUkscUJBQWFOLEtBQWI7QUFDQUEsZ0JBQVFPLFdBQVcsWUFBVztBQUMxQlQsZUFBR1UsS0FBSCxDQUFTUCxPQUFULEVBQWtCQyxJQUFsQjtBQUNILFNBRk8sRUFFTEgsS0FGSyxDQUFSO0FBR0gsS0FYRDtBQVlIO0FBQ0Q7QUFDQSxTQUFTVSxHQUFULEdBQWU7QUFDWEwsWUFBUUMsR0FBUixDQUFZLG9CQUFaO0FBQ0g7O0FBRUQ7QUFDQUssU0FBU0MsZ0JBQVQsQ0FBMEIsUUFBMUIsRUFBb0NkLFNBQVNZLEdBQVQsRUFBYyxHQUFkLENBQXBDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZGVib3VuY2Xlh73mlbDnlKjmnaXljIXoo7nmiJHku6znmoTkuovku7ZcclxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIGRlbGF5KSB7XHJcbiAgICAvLyDmjIHkuYXljJbkuIDkuKrlrprml7blmaggdGltZXJcclxuICAgIGxldCB0aW1lciA9IG51bGw7XHJcbiAgICAvLyDpl63ljIXlh73mlbDlj6/ku6Xorr/pl64gdGltZXJcclxuICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyDpgJrov4cgJ3RoaXMnIOWSjCAnYXJndW1lbnRzJ1xyXG4gICAgICAgIC8vIOiOt+W+l+WHveaVsOeahOS9nOeUqOWfn+WSjOWPguaVsFxyXG4gICAgICAgIGxldCBjb250ZXh0ID0gdGhpcztcclxuICAgICAgICBsZXQgYXJncyA9IGFyZ3VtZW50cztcclxuICAgICAgICBjb25zb2xlLmxvZyhhcmdzKVxyXG4gICAgICAgIC8vIOWmguaenOS6i+S7tuiiq+inpuWPke+8jOa4hemZpCB0aW1lciDlubbph43mlrDlvIDlp4vorqHml7ZcclxuICAgICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xyXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZm4uYXBwbHkoY29udGV4dCwgYXJncyk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfVxyXG59XHJcbi8vIOW9k+eUqOaIt+a7muWKqOaXtuWHveaVsOS8muiiq+iwg+eUqFxyXG5mdW5jdGlvbiBmb28oKSB7XHJcbiAgICBjb25zb2xlLmxvZygnWW91IGFyZSBzY3JvbGxpbmchJyk7XHJcbn1cclxuXHJcbi8vIOWcqOS6i+S7tuinpuWPkeeahOS4pOenkuWQju+8jOaIkeS7rOWMheijueWcqGRlYm91bmNl5Lit55qE5Ye95pWw5omN5Lya6KKr6Kem5Y+RXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGRlYm91bmNlKGZvbywgNTAwKSk7Il19
