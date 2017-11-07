/**
 * Created by Administrator on 2017/11/3.
 */
class Circle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.r = Math.random() * 10;
        this._mx = Math.random();
        this._my = Math.random();
    }
    //canvas 画圆和画直线
    //画圆就是正常的用canvas画一个圆

    drawCircle(ctx) {
        // beginPath() 方法开始一条路径，或重置当前的路径
        ctx.beginPath();
        //arc() 方法使用一个中心点和半径，为一个画布的当前子路径添加一条弧。
        ctx.arc(this.x, this.y, this.r, 0, 360)
        //closePath() 方法创建从当前点到开始点的路径。
        ctx.closePath();
        //fillStyle()方法设置或返回用于填充绘画的颜色、渐变或模式。
        ctx.fillStyle = 'rgba(204, 204, 204, 0.3)';
        //fill()方法    填充当前绘图（路径）
        ctx.fill();
    }

    drawLine(ctx, _circle) { //_circle为终点的圆
        let dx = this.x - _circle.x;
        let dy = this.y - _circle.y;
        let d = Math.sqrt(dx * dx + dy * dy)
        if (d < 150) {  //画直线是两个圆连线，为了避免直线过多，给圆圈距离设置了一个值，距离很远的圆圈，就不做连线处理
            ctx.beginPath();
            //开始一条路径，移动到位置 this.x,this.y。创建到达位置 _circle.x,_circle.y 的一条线：
            ctx.moveTo(this.x, this.y);   //起始点
            ctx.lineTo(_circle.x, _circle.y);   //下一个圆，终点
            ctx.closePath();
            ctx.strokeStyle = 'rgba(204, 204, 204, 0.3)';
            ctx.stroke();
        }
    }

    // 圆圈移动
    // 圆圈移动的距离必须在屏幕范围内
    move(w, h) {
        this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
        this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
        this.x += this._mx / 2;
        this.y += this._my / 2;
    }
}
//鼠标点画圆闪烁变动
class currentCirle extends Circle {
    constructor(x, y) {
        super(x, y)
    }

    drawCircle(ctx) {
        ctx.beginPath();
        //注释内容为鼠标焦点的地方圆圈半径变化
        //this.r = (this.r < 14 && this.r > 1) ? this.r + (Math.random() * 2 - 1) : 2;
        this.r = 8;
        ctx.arc(this.x, this.y, this.r, 0, 360);
        ctx.closePath();
        ctx.fillStyle = 'red'
        ctx.fill();

    }
}
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let w = canvas.width = canvas.offsetWidth;
let h = canvas.height = canvas.offsetHeight;
let circles = [];
let current_circle = new currentCirle(0, 0);
//current_circle
// r:4.245815254504139
// x:0
// y:0
// _mx:0.8478391345064733
// _my:0.5649154670487617

console.log("current_circle",current_circle)
let draw = function () {
    ctx.clearRect(0, 0, w, h);//清除画布内容
    for (let i = 0; i < circles.length; i++) {
        circles[i].move(w, h);
        circles[i].drawCircle(ctx); //画圆
        for (var j = i + 1; j < circles.length; j++) {
            circles[i].drawLine(ctx, circles[j]) //画某一个圆与其他圆之间的连线
        }
    }
    if (current_circle.x) { //一开始的时候current_circle.x为0 ，不执行current_circle.drawCircle(ctx);
        current_circle.drawCircle(ctx);
        for (var k = 1; k < circles.length; k++) {
            current_circle.drawLine(ctx, circles[k])
        }
    }
    requestAnimationFrame(draw)//重复调用draw
}

let init = function (num) {
    for (var i = 0; i < num; i++) {
        // 设置60个圆形
        // r:4.245815254504139
        // x:441.326098905697
        // y:734.4708073663779
        // _mx:0.8478391345064733
        // _my:0.5649154670487617
        circles.push(new Circle(Math.random() * w, Math.random() * h));
    }
    console.log('circles',circles)
    draw()
}
window.addEventListener('load', init(60));
window.onmousemove = function (e) {
    e = e || window.event;
    current_circle.x = e.clientX;
    current_circle.y = e.clientY;
}
window.onmouseout = function () {
    current_circle.x = null;
    current_circle.y = null;

};