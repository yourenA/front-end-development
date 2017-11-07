'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Administrator on 2017/11/3.
 */
var Circle = function () {
    function Circle(x, y) {
        _classCallCheck(this, Circle);

        this.x = x;
        this.y = y;
        this.r = Math.random() * 10;
        this._mx = Math.random();
        this._my = Math.random();
    }
    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆

    _createClass(Circle, [{
        key: 'drawCircle',
        value: function drawCircle(ctx) {
            // beginPath() 方法开始一条路径，或重置当前的路径
            ctx.beginPath();
            //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
            ctx.arc(this.x, this.y, this.r, 0, 360);
            //closePath() 方法创建从当前点到开始点的路径。
            ctx.closePath();
            //fillStyle()方法设置或返回用于填充绘画的颜色、渐变或模式。
            ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
            //fill()方法    填充当前绘图（路径）
            ctx.fill();
        }
    }, {
        key: 'drawLine',
        value: function drawLine(ctx, _circle) {
            //_circle为终点的圆
            var dx = this.x - _circle.x;
            var dy = this.y - _circle.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < 150) {
                //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
                ctx.beginPath();
                //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
                ctx.moveTo(this.x, this.y); //起始点
                ctx.lineTo(_circle.x, _circle.y); //下一个圆，终点
                ctx.closePath();
                ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
                ctx.stroke();
            }
        }

        // 圆圈移动
        // 圆圈移动的距离必须在屏幕范围内

    }, {
        key: 'move',
        value: function move(w, h) {
            this._mx = this.x < w && this.x > 0 ? this._mx : -this._mx;
            this._my = this.y < h && this.y > 0 ? this._my : -this._my;
            this.x += this._mx / 2;
            this.y += this._my / 2;
        }
    }]);

    return Circle;
}();
//鼠标点画圆闪烁变动


var currentCirle = function (_Circle) {
    _inherits(currentCirle, _Circle);

    function currentCirle(x, y) {
        _classCallCheck(this, currentCirle);

        return _possibleConstructorReturn(this, (currentCirle.__proto__ || Object.getPrototypeOf(currentCirle)).call(this, x, y));
    }

    _createClass(currentCirle, [{
        key: 'drawCircle',
        value: function drawCircle(ctx) {
            ctx.beginPath();
            //注释内容为鼠标焦点的地方圆圈半径变化
            //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
            this.r = 8;
            ctx.arc(this.x, this.y, this.r, 0, 360);
            ctx.closePath();
            ctx.fillStyle = 'red';
            ctx.fill();
        }
    }]);

    return currentCirle;
}(Circle);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var w = canvas.width = canvas.offsetWidth;
var h = canvas.height = canvas.offsetHeight;
var circles = [];
var current_circle = new currentCirle(0, 0);
//current_circle
// r:4.245815254504139
// x:0
// y:0
// _mx:0.8478391345064733
// _my:0.5649154670487617

console.log("current_circle", current_circle);
var draw = function draw() {
    ctx.clearRect(0, 0, w, h); //清除画布内容
    for (var i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx); //画圆
        for (var j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j]); //画某一个圆与其他圆之间的连线
        }
    }
    if (current_circle.x) {
        //一开始的时候current_circle.x为0 ，不执行current_circle.drawCircle(ctx);
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k]);
        }
    }
    requestAnimationFrame(draw); //重复调用draw
};

var init = function init(num) {
    for (var i = 0; i < num; i++) {
        // 设置60个圆形
        // r:4.245815254504139
        // x:441.326098905697
        // y:734.4708073663779
        // _mx:0.8478391345064733
        // _my:0.5649154670487617
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    console.log('circles', circles);
    draw();
};
window.addEventListener('load', init(60));
window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
};
window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhcy5qcyJdLCJuYW1lcyI6WyJDaXJjbGUiLCJ4IiwieSIsInIiLCJNYXRoIiwicmFuZG9tIiwiX214IiwiX215IiwiY3R4IiwiYmVnaW5QYXRoIiwiYXJjIiwiY2xvc2VQYXRoIiwiZmlsbFN0eWxlIiwiZmlsbCIsIl9jaXJjbGUiLCJkeCIsImR5IiwiZCIsInNxcnQiLCJtb3ZlVG8iLCJsaW5lVG8iLCJzdHJva2VTdHlsZSIsInN0cm9rZSIsInciLCJoIiwiY3VycmVudENpcmxlIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImdldENvbnRleHQiLCJ3aWR0aCIsIm9mZnNldFdpZHRoIiwiaGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiY2lyY2xlcyIsImN1cnJlbnRfY2lyY2xlIiwiY29uc29sZSIsImxvZyIsImRyYXciLCJjbGVhclJlY3QiLCJpIiwibGVuZ3RoIiwibW92ZSIsImRyYXdDaXJjbGUiLCJqIiwiZHJhd0xpbmUiLCJrIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiaW5pdCIsIm51bSIsInB1c2giLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwib25tb3VzZW1vdmUiLCJlIiwiZXZlbnQiLCJjbGllbnRYIiwiY2xpZW50WSIsIm9ubW91c2VvdXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7O0lBR01BLE07QUFDRixvQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQUE7O0FBQ2QsYUFBS0QsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsYUFBS0MsQ0FBTCxHQUFTQyxLQUFLQyxNQUFMLEtBQWdCLEVBQXpCO0FBQ0EsYUFBS0MsR0FBTCxHQUFXRixLQUFLQyxNQUFMLEVBQVg7QUFDQSxhQUFLRSxHQUFMLEdBQVdILEtBQUtDLE1BQUwsRUFBWDtBQUNIO0FBQ0Q7QUFDQTs7OzttQ0FFV0csRyxFQUFLO0FBQ1o7QUFDQUEsZ0JBQUlDLFNBQUo7QUFDQTtB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QVpEO0FBYUFhLE9BQU9DLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDSixLQUFLLEVBQUwsQ0FBaEM7QUFDQUcsT0FBT0UsV0FBUCxHQUFxQixVQUFVQyxDQUFWLEVBQWE7QUFDOUJBLFFBQUlBLEtBQUtILE9BQU9JLEtBQWhCO0FBQ0FwQixtQkFBZWxDLENBQWYsR0FBbUJxRCxFQUFFRSxPQUFyQjtBQUNBckIsbUJBQWVqQyxDQUFmLEdBQW1Cb0QsRUFBRUcsT0FBckI7QUFDSCxDQUpEO0FBS0FOLE9BQU9PLFVBQVAsR0FBb0IsWUFBWTtBQUM1QnZCLG1CQUFlbEMsQ0FBZixHQUFtQixJQUFuQjtBQUNBa0MsbUJBQWVqQyxDQUFmLEdBQW1CLElBQW5CO0FBRUgsQ0FKRCIsImZpbGUiOiJjYW52YXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBBZG1pbmlzdHJhdG9yIG9uIDIwMTcvMTEvMy5cclxuICovXHJcbmNsYXNzIENpcmNsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMuciA9IE1hdGgucmFuZG9tKCkgKiAxMDtcclxuICAgICAgICB0aGlzLl9teCA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgdGhpcy5fbXkgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgfVxyXG4gICAgLy9jYW52YXMg55S75ZyG5ZKM55S755u057q/XHJcbiAgICAvL+eUu+WchuWwseaYr+ato+W4uOeahOeUqGNhbnZhc+eUu+S4gOS4quWchlxyXG5cclxuICAgIGRyYXdDaXJjbGUoY3R4KSB7XHJcbiAgICAgICAgLy8gYmVnaW5QYXRoKCkg5pa55rOV5byA5aeL5LiA5p2h6Lev5b6E77yM5oiW6YeN572u5b2T5YmN55qE6Lev5b6EXHJcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgIC8vYXJjKCkg5pa55rOV5L2/55So5LiA5Liq5Lit5b+D54K55ZKM5Y2K5b6E77yM5Li65LiA5Liq55S75biD55qE5b2T5YmN5a2Q6Lev5b6E5re75Yqg5LiA5p2h5byn44CCXHJcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yLCAwLCAzNjApXHJcbiAgICAgICAgLy9jbG9zZVBhdGgoKSDmlrnms5XliJvlu7rku47lvZPliY3ngrnliLDlvIDlp4vngrnnmoTot6/lvoTjgIJcclxuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICAgICAgLy9maWxsU3R5bGUoKeaWueazleiuvue9ruaIlui/lOWbnueUqOS6juWhq+WFhee7mOeUu+eahOminOiJsuOAgea4kOWPmOaIluaooeW8j+OAglxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSAncmdiYSgyMDQsIDIwNCwgMjA0LCAwLjMpJztcclxuICAgICAgICAvL2ZpbGwoKeaWueazlSAgICDloavlhYXlvZPliY3nu5jlm77vvIjot6/lvoTvvIlcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGRyYXdMaW5lKGN0eCwgX2NpcmNsZSkgeyAvL19jaXJjbGXkuLrnu4jngrnnmoTlnIZcclxuICAgICAgICBsZXQgZHggPSB0aGlzLnggLSBfY2lyY2xlLng7XHJcbiAgICAgICAgbGV0IGR5ID0gdGhpcy55IC0gX2NpcmNsZS55O1xyXG4gICAgICAgIGxldCBkID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KVxyXG4gICAgICAgIGlmIChkIDwgMTUwKSB7ICAvL+eUu+ebtOe6v+aYr+S4pOS4quWchui/nue6v++8jOS4uuS6humBv+WFjeebtOe6v+i/h+Wkmu+8jOe7meWchuWciOi3neemu+iuvue9ruS6huS4gOS4quWAvO+8jOi3neemu+W+iOi/nOeahOWchuWciO+8jOWwseS4jeWBmui/nue6v+WkhOeQhlxyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIC8v5byA5aeL5LiA5p2h6Lev5b6E77yM56e75Yqo5Yiw5L2N572uIHRoaXMueCx0aGlzLnnjgILliJvlu7rliLDovr7kvY3nva4gX2NpcmNsZS54LF9jaXJjbGUueSDnmoTkuIDmnaHnur/vvJpcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyh0aGlzLngsIHRoaXMueSk7ICAgLy/otbflp4vngrlcclxuICAgICAgICAgICAgY3R4LmxpbmVUbyhfY2lyY2xlLngsIF9jaXJjbGUueSk7ICAgLy/kuIvkuIDkuKrlnIbvvIznu4jngrlcclxuICAgICAgICAgICAgY3R4LmNsb3NlUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSAncmdiYSgyMDQsIDIwNCwgMjA0LCAwLjMpJztcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlnIblnIjnp7vliqhcclxuICAgIC8vIOWchuWciOenu+WKqOeahOi3neemu+W/hemhu+WcqOWxj+W5leiMg+WbtOWGhVxyXG4gICAgbW92ZSh3LCBoKSB7XHJcbiAgICAgICAgdGhpcy5fbXggPSAodGhpcy54IDwgdyAmJiB0aGlzLnggPiAwKSA/IHRoaXMuX214IDogKC10aGlzLl9teCk7XHJcbiAgICAgICAgdGhpcy5fbXkgPSAodGhpcy55IDwgaCAmJiB0aGlzLnkgPiAwKSA/IHRoaXMuX215IDogKC10aGlzLl9teSk7XHJcbiAgICAgICAgdGhpcy54ICs9IHRoaXMuX214IC8gMjtcclxuICAgICAgICB0aGlzLnkgKz0gdGhpcy5fbXkgLyAyO1xyXG4gICAgfVxyXG59XHJcbi8v6byg5qCH54K555S75ZyG6Zeq54OB5Y+Y5YqoXHJcbmNsYXNzIGN1cnJlbnRDaXJsZSBleHRlbmRzIENpcmNsZSB7XHJcbiAgICBjb25zdHJ1Y3Rvcih4LCB5KSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSlcclxuICAgIH1cclxuXHJcbiAgICBkcmF3Q2lyY2xlKGN0eCkge1xyXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAvL+azqOmHiuWGheWuueS4uum8oOagh+eEpueCueeahOWcsOaWueWchuWciOWNiuW+hOWPmOWMllxyXG4gICAgICAgIC8vdGhpcy5yID0gKHRoaXMuciA8IDE0ICYmIHRoaXMuciA+IDEpID8gdGhpcy5yICsgKE1hdGgucmFuZG9tKCkgKiAyIC0gMSkgOiAyO1xyXG4gICAgICAgIHRoaXMuciA9IDg7XHJcbiAgICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yLCAwLCAzNjApO1xyXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gJ3JlZCdcclxuICAgICAgICBjdHguZmlsbCgpO1xyXG5cclxuICAgIH1cclxufVxyXG5sZXQgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpO1xyXG5sZXQgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbmxldCB3ID0gY2FudmFzLndpZHRoID0gY2FudmFzLm9mZnNldFdpZHRoO1xyXG5sZXQgaCA9IGNhbnZhcy5oZWlnaHQgPSBjYW52YXMub2Zmc2V0SGVpZ2h0O1xyXG5sZXQgY2lyY2xlcyA9IFtdO1xyXG5sZXQgY3VycmVudF9jaXJjbGUgPSBuZXcgY3VycmVudENpcmxlKDAsIDApO1xyXG4vL2N1cnJlbnRfY2lyY2xlXHJcbi8vIHI6NC4yNDU4MTUyNTQ1MDQxMzlcclxuLy8geDowXHJcbi8vIHk6MFxyXG4vLyBfbXg6MC44NDc4MzkxMzQ1MDY0NzMzXHJcbi8vIF9teTowLjU2NDkxNTQ2NzA0ODc2MTdcclxuXHJcbmNvbnNvbGUubG9nKFwiY3VycmVudF9jaXJjbGVcIixjdXJyZW50X2NpcmNsZSlcclxubGV0IGRyYXcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHcsIGgpOy8v5riF6Zmk55S75biD5YaF5a65XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNpcmNsZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBjaXJjbGVzW2ldLm1vdmUodywgaCk7XHJcbiAgICAgICAgY2lyY2xlc1tpXS5kcmF3Q2lyY2xlKGN0eCk7IC8v55S75ZyGXHJcbiAgICAgICAgZm9yICh2YXIgaiA9IGkgKyAxOyBqIDwgY2lyY2xlcy5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICBjaXJjbGVzW2ldLmRyYXdMaW5lKGN0eCwgY2lyY2xlc1tqXSkgLy/nlLvmn5DkuIDkuKrlnIbkuI7lhbbku5blnIbkuYvpl7TnmoTov57nur9cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoY3VycmVudF9jaXJjbGUueCkgeyAvL+S4gOW8gOWni+eahOaXtuWAmWN1cnJlbnRfY2lyY2xlLnjkuLowIO+8jOS4jeaJp+ihjGN1cnJlbnRfY2lyY2xlLmRyYXdDaXJjbGUoY3R4KTtcclxuICAgICAgICBjdXJyZW50X2NpcmNsZS5kcmF3Q2lyY2xlKGN0eCk7XHJcbiAgICAgICAgZm9yICh2YXIgayA9IDE7IGsgPCBjaXJjbGVzLmxlbmd0aDsgaysrKSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRfY2lyY2xlLmRyYXdMaW5lKGN0eCwgY2lyY2xlc1trXSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJhdykvL+mHjeWkjeiwg+eUqGRyYXdcclxufVxyXG5cclxubGV0IGluaXQgPSBmdW5jdGlvbiAobnVtKSB7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bTsgaSsrKSB7XHJcbiAgICAgICAgLy8g6K6+572uNjDkuKrlnIblvaJcclxuICAgICAgICAvLyByOjQuMjQ1ODE1MjU0NTA0MTM5XHJcbiAgICAgICAgLy8geDo0NDEuMzI2MDk4OTA1Njk3XHJcbiAgICAgICAgLy8geTo3MzQuNDcwODA3MzY2Mzc3OVxyXG4gICAgICAgIC8vIF9teDowLjg0NzgzOTEzNDUwNjQ3MzNcclxuICAgICAgICAvLyBfbXk6MC41NjQ5MTU0NjcwNDg3NjE3XHJcbiAgICAgICAgY2lyY2xlcy5wdXNoKG5ldyBDaXJjbGUoTWF0aC5yYW5kb20oKSAqIHcsIE1hdGgucmFuZG9tKCkgKiBoKSk7XHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmxvZygnY2lyY2xlcycsY2lyY2xlcylcclxuICAgIGRyYXcoKVxyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgaW5pdCg2MCkpO1xyXG53aW5kb3cub25tb3VzZW1vdmUgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgY3VycmVudF9jaXJjbGUueCA9IGUuY2xpZW50WDtcclxuICAgIGN1cnJlbnRfY2lyY2xlLnkgPSBlLmNsaWVudFk7XHJcbn1cclxud2luZG93Lm9ubW91c2VvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjdXJyZW50X2NpcmNsZS54ID0gbnVsbDtcclxuICAgIGN1cnJlbnRfY2lyY2xlLnkgPSBudWxsO1xyXG5cclxufTsiXX0=
