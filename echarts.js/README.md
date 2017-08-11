# echarts.js

## 可以通过webpack 引入
```
$ npm install echarts --save
```
### 引入全部
```
var echarts = require('echarts');
```
### 按需引入
```
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts');
// 引入柱状图
require('echarts/lib/chart/bar');
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
```

## echarts.setOption(options)

**options 配置项**
- title 标题
    - text: 文字
    - textStyle: 文字样式
    - show: 是否显示
    - link: 标题超链接
    - target: 指定超链接打开窗口
    - subtext: 副标题
    - itemGap: 主副标题间距
    - left right top bottom: 标题离左右上下侧的距离
    - backgroundColor: 背景颜色
    - z zlevel: zlevel 大的 Canvas 会放在 zlevel 小的 Canvas 的上面。

- legend 图例
    - orient: 图例的布局方向
        - 'horizontal' (默认)
        - 'vertical'
    - align: 图例标志和文本对齐方式
    - selectedMode: 控制是否可以通过点击图例改变系列的显示状态
    - formatter: 格式化图例文本
    - data: 图例的数据数组 每一项代表一个系列的 name 
        - name: 图例项的名称，应等于某系列的name值
        - icon: 图例项的 icon


- xAxis 直角坐标系 grid 中的 x 轴
    - data: 类目数据，在类目轴（type: 'category'）中有效。
    ```
    // 所有类目名称列表
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    // 每一项也可以是具体的配置项，此时取配置项中的 `value` 为类目名
    data: [{
        value: '周一',
        // 突出周一
        textStyle: {
            fontSize: 20,
            color: 'red'
        }
    }, '周二', '周三', '周四', '周五', '周六', '周日']
   
    ```
    - gridIndex: x 轴所在的 grid 的索引，默认位于第一个 grid
    - position: x 轴的位置
    - offset: x轴相对于默认位置的偏移，在相同的 position 上有多个 X 轴的时候有用
    - type: x轴类型
        - value: 数值轴，适用于连续数据。
        - category: 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
        - time: 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
        - log: 对数轴。适用于对数数据。
    - name: x轴名称
    - nameLocation: x轴名称位置
    - nameGap: x轴名称与x轴距离
    - nameRotate: 名称旋转
    - inverse: 是否是反向坐标轴
    - min/max : 坐标轴刻度最小/大值，可以设置成特殊值 'dataMin'/'dataMax'，此时取数据在该轴上的最小/大值作为最小/大刻度。
    - interval : 强制设置坐标轴分割间隔。
    - minInterval: 自动计算的坐标轴最小间隔大小。只在数值轴中（type: 'value'）有效。
    - triggerEvent: 坐标轴的标签是否响应和触发鼠标事件，默认不响应。
    
- yAxis :直角坐标系 grid 中的 y 轴 (各设置项与xAxis中相似)
- radiusAxis: 极坐标系的径向轴。(半径)
    - polarIndex:径向轴所在的极坐标系的索引，默认使用第一个极坐标系。
    - type: 坐标轴类型