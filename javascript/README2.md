### countUp.js
轻量级javaScript工具，可用于快速创建动画，以更有趣的方式显示数字数据。作用：动画显示数字，千位分隔符，添加前后缀等。

项目主页:[https://inorganik.github.io/countUp.js/](https://inorganik.github.io/countUp.js/)
### countUp.js API
```js
const options = {
};
let demo = new CountUp(target,endValue, options);
demo.start();
```
**options值**
* target = 目标元素的 ID；
* useGrouping = 是否使用千分符分割，默认true
* startVal = 开始值；
* endVal = 结束值；
* decimal = 小数分隔符；
* duration = 动画延迟秒数，默认值是2；
* decimalPlaces = 小数位数，默认值是0；
* prefix = 前缀；
* suffix = 后缀

### 在react中使用react-countup
**安装**
```
yarn add react-countup
```
**使用**
```
import CountUp from 'react-countup';

<CountUp
  start={-875.039}
  end={160527.012}
  duration={2.75}
  separator=" "
  decimals={4}
  decimal=","
  prefix="EUR "
  suffix=" left"
  onEnd={() => console.log('Ended! 👏')}
  onStart={() => console.log('Started! 💨')}
>
  {({ countUpRef, start }) => (
    <div>
      <span ref={countUpRef} />
      <button onClick={start}>Start</button>
    </div>
  )}
</CountUp>
```