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
    - splitLine : 坐标轴在 grid 区域中的分隔线。
    - nameLocation: x轴名称位置
    - nameGap: x轴名称与x轴距离
    - nameRotate: 名称旋转
    - inverse: 是否是反向坐标轴
    - min/max : 坐标轴刻度最小/大值，可以设置成特殊值 'dataMin'/'dataMax'，此时取数据在该轴上的最小/大值作为最小/大刻度。
    - interval : 强制设置坐标轴分割间隔。
    - minInterval: 自动计算的坐标轴最小间隔大小。只在数值轴中（type: 'value'）有效。
    - triggerEvent: 坐标轴的标签是否响应和触发鼠标事件，默认不响应。
    
- yAxis :直角坐标系 grid 中的 y 轴 (各设置项与xAxis中相似)

- polar: 极坐标系，可以用于散点图和折线图。每个极坐标系拥有一个**角度轴**和一个**半径轴**。
    - center:极坐标系的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
    - radius :极坐标系的半径，数组的第一项是内半径，第二项是外半径。
    
- radiusAxis: 极坐标系的径向轴。(半径的那一条线)(部分设置项与xAxis中相似)
    - polarIndex:径向轴所在的极坐标系的索引，默认使用第一个极坐标系。
    - type: 坐标轴类型
    - boundaryGap:坐标轴两边留白策略，类目轴和非类目轴的设置和表现不一样。
    - axisLine: 坐标轴轴线相关设置。
        - show: 是否显示坐标轴轴线。默认显示
    - axisTick: 坐标轴刻度相关设置。
        - show: 是否显示坐标轴刻度。
    - data : 类目数据，在类目轴（type: 'category'）中有效。
- angleAxis: 极坐标系的角度轴。
    - startAngle: 起始刻度的角度，默认为 90 度，即圆心的正上方。0 度为圆心的正右方。
    - clockwise: 刻度增长是否按顺时针，默认顺时针。
    - silent : 坐标轴是否是静态无法交互。
    - data : 类目数据，在类目轴（type: 'category'）中有效。
    
- radar: 雷达图 （部分设置项与angleAxis中相似）
    - shape :雷达图绘制类型，支持 'polygon' 和 'circle'。默认'polygon'
    - indicator:雷达图的指示器，用来指定雷达图中的多个变量（维度）,结构[{},{},{}]
        - name :指示器名称
        - min/max :指示器最小值/最大值

- dataZoom: 区域缩放组件 [{},{},{},{}]
    - 内置型数据区域缩放组件（dataZoomInside）：内置于坐标系中，使用户可以在坐标系上通过鼠标拖拽、鼠标滚轮、手指滑动（触屏上）来缩放或漫游坐标系。
        - type : 类型,默认inside
        - disabled : 是否停止组件的功能。
        - xAxisIndex : 设置 dataZoom-inside 组件控制的 x轴。如果是 number 表示控制一个轴，如果是 Array 表示控制多个轴。
        - yAxisIndex : 设置 dataZoom-inside 组件控制的 y轴
        - radiusAxisIndex : 设置 dataZoom-inside 组件控制的 radius 轴 (径向轴)
        - angleAxisIndex : 设置 dataZoom-inside 组件控制的 angle 轴 (角度轴)
        - filterMode : 数据过滤, dataZoom 的运行原理是通过 数据过滤 来达到 数据窗口缩放 的效果。
        - start/end : 数据窗口范围的起始/结束百分比。范围是：0 ~ 100。表示 0% ~ 100%。
        - orient : 布局方式是横还是竖。不仅是布局方式，对于直角坐标系而言，也决定了，缺省情况控制横向数轴还是纵向数轴。
            - 'horizontal'：水平。
            - 'vertical'：竖直。
        - zoomLock : 是否锁定选择区域（或叫做数据窗口）的大小。如果设置为 true 则锁定选择区域的大小，也就是说，只能平移，不能缩放。
    - 滑动条型数据区域缩放组件（dataZoomSlider）：有单独的滑动条，用户在滑动条上进行缩放或漫游。
        - 部分设置项与dataZoomInside相似
        - show : 是否显示 组件。如果设置为 false，不会显示，但是数据过滤的功能还存在。
        - backgroundColor: 组件的背景颜色。
        - showDataShadow : 是否在 dataZoom-silder 组件中显示数据阴影。数据阴影可以简单地反应数据走势。
        - left/top/right/bottom : 与容器的距离

- visualMap 是视觉映射组件，用于进行『视觉编码』，也就是将数据映射到视觉元素（视觉通道）。
    ```
    option = {
        visualMap: [
            { // 第一个 visualMap 组件
                type: 'continuous', // 定义为连续型 viusalMap
                ...
            },
            { // 第二个 visualMap 组件
                type: 'piecewise', // 定义为分段型 visualMap
                ...
            }
        ],
        ...
    };
    ```
    - visualMap[i]-continuous : 连续型视觉映射组件
        - type : 类型
        - show : 是否显示 visualMap-continuous 组件。如果设置为 false，不会显示，但是数据映射的功能还存在。
        - min/max : 最小/大值，用户必须指定
        - range : 指定手柄对应数值的位置。range 应在 min max 范围内。  range: [4, 15] 初始化两个手柄对应的数值是 4 和 15,
        - calculable : 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。
        - inverse : 是否反转 visualMap 组件。
        - precision : 数据展示的小数精度，默认为0，无小数点。
        - itemWidth /itemHeight :图形的宽/高度，即长条的宽/高度。
        - align : 指定组件中手柄和文字的摆放位置
        - text : 两端的文本，如 ['High', 'Low']
        - seriesIndex : 指定取哪个系列的数据，即哪个系列的 series.data。
        - inRange : 定义 在选中范围中 的视觉元素。
        ```
                 inRange: {
                    color: ['#121122', 'rgba(3,4,5,0.4)', 'red'],
                    symbolSize: [30, 100]
                }
        ```
        - outOfRange : 定义 在选中范围外 的视觉元素。
        - color : 这个配置项，是为了兼容 ECharts2 而存在，ECharts3 中已经不推荐使用。它的功能已经移到了 visualMap-continuous.inRange 和 visualMap-continuous.outOfRange 中。
    
    - visualMap[i]-piecewise : 分段型视觉映射组件
        - splitNumber : 对于连续型数据，自动平均切分成几段。默认为5段。 
        - pieces : 自定义『分段式视觉映射组件（visualMapPiecewise）』的每一段的范围，以及每一段的文字，以及每一段的特别的样式
        
    - tooltip : 提示框组件
        - trigger : 触发类型。
            - item : 数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
            - axis : 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。
            - none : 什么都不触发。
        - axisPointer : 
        - alwaysShowContent : 是否永远显示提示框内容
        - triggerOn : 提示框触发的条件
        - enterable : 鼠标是否可进入提示框浮层中，默认为false，如需详情内交互，如添加链接，按钮，可设置为 true。
        - confine : 是否将 tooltip 框限制在图表的区域内。
        - position : 提示框浮层的位置，默认不设置时位置会跟随鼠标的位置。
        - formatter : 提示框浮层内容格式器，支持字符串模板和回调函数两种形式。
    
    - axisPointer : 这是坐标轴指示器（axisPointer）的全局公用设置
        - 显示axisPointer: 直角坐标系 grid、极坐标系 polar、单轴坐标系 single 中的每个轴都自己的 axisPointer。
            - 设置轴上的 axisPointer.show（例如 xAxis.axisPointer.show）为 true，则显示此轴的 axisPointer。
            - 设置 tooltip.trigger 设置为 'axis' 或者 tooltip.axisPointer.type 设置为 'cross'
        - 显示 axisPointer 的 label : 
            - 设置轴上的 axisPointer.label.show（例如 xAxis.axisPointer.label.show）为 true，则显示此轴的 axisPointer 的 label。
            - 设置 tooltip.axisPointer.type 为 'cross' 时会自动显示 axisPointer 的 label。
        
        - show : 默认不显示。但是如果 tooltip.trigger 设置为 'axis' 或者 tooltip.axisPointer.type 设置为 'cross'，则自动显示 axisPointer
        - type : 'line' 直线指示器(默认), 'shadow' 阴影指示器
        - snap : 坐标轴指示器是否自动吸附到点上。默认自动判断。
        - label : 坐标轴指示器的文本标签。
    
    - toolbox : 工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
        - show : 是否显示工具栏组件。
        - orient : 工具栏 icon 的布局朝向。
        - itemSize : 工具栏 icon 的大小。
        - itemGap : 工具栏 icon 每项之间的间隔。横向布局时为水平间隔，纵向布局时为纵向间隔。
        - showTitle : 是否在鼠标 hover 的时候显示每个工具 icon 的标题。
        - feature : 各工具配置项。
            - saveAsImage : 保存为图片。
            - restore : 配置项还原。
            - dataView : 数据视图工具，可以展现当前图表所用的数据，编辑后可以动态更新。
            - dataZoom : 数据区域缩放。目前只支持直角坐标系的缩放。
            - magicType : 动态类型切换 
    
    - brush : brush 是区域选择组件，用户可以选择图中一部分数据，从而便于向用户展示被选中数据，或者他们的一些统计计算结果。
        - toolbox : 使用在 toolbox 中的按钮。[ default: ['rect', 'polygon', 'keep', 'clear'] ]
    
    - geo : 地理坐标系组件。
        - show : 是否显示地理坐标系组件。
        - map : 地图类型。
        - roam : 是否开启鼠标缩放和平移漫游。默认不开启。如果只想要开启缩放或者平移，可以设置成 'scale' 或者 'move'。设置成 true 为都开启
        - center : 当前视角的中心点，用经纬度表示
        - boundingCoords : 二维数组，定义定位的左上角以及右下角分别所对应的经纬度。
        - zoom : 当前视角的缩放比例。
        - scaleLimit : 滚轮缩放的极限控制，通过min, max最小和最大的缩放值，默认的缩放为1。
        - nameMap : 自定义地区的名称映射
        - selectedMode : 选中模式，表示是否支持多个选中，默认关闭，支持布尔值和字符串，字符串取值可选'single'表示单选，或者'multiple'表示多选。
        - label :图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等
            - normal : 普通状态
            - emphasis: 高亮状态
        - itemStyle ; 地图区域的多边形 图形样式，有 normal 和 emphasis 两个状态.normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式
        - layoutSize : 地图的大小，见 layoutCenter。支持相对于屏幕宽高的百分比或者绝对的像素大小。
        - regions : 在地图中对特定的区域配置样式。
        - silent : 图形是否不响应和触发鼠标事件，默认为 false，即响应和触发鼠标事件。
    
    - singleAxis : 单轴。可以被应用到散点图中展现一维数据 (部分设置项与xAxis相似)
        - orient : 轴的朝向，默认水平朝向，可以设置成 'vertical' 垂直朝向。
    
    - timeline : timeline 组件，提供了在多个 ECharts option 间进行切换、播放等操作的功能。
    
    - calendar : 日历坐标系组件。
        - cellSize : 日历每格框的大小，可设置单值 或数组 第一个元素是宽 第二个元素是高。 支持设置自适应：auto, 默认为高宽均为20
        - orient : 日历坐标的布局朝向。
        - splitLine : 设置日历坐标分隔线的样式。
        - borderWidth : calendar描边线宽。为 0 时无描边。
    
    - series : 系列列表。每个系列通过 type 决定自己的图表类型
        - series[i]-line : 折线图
            - symbol : 标记的图形。
            - showSymbol : 是否显示 symbol, 如果 false 则只有在 tooltip hover 的时候显示。
            - hoverAnimation : 是否开启 hover 在拐点标志上的提示动画效果。
            - legendHoverLink : 是否启用图例 hover 时的联动高亮。
            - stack : 数据堆叠
            - step : 是否是阶梯线图。可以设置为 true 显示成阶梯线图
            - areaStyle : 区域填充样式。
            - markPoint : 图表标注。
                - data[i] : 标注的数据数组。每个数组项是一个对象
                ```
                 data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'},
                       ]
                ```
            - markLine : 图表标线。
                - data[i] 
                ```
                markLine: {
                                data: [
                                    {type: 'average', name: '平均值'},
                                    [{
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, {
                                        symbol: 'circle',
                                        label: {
                                            normal: {
                                                position: 'start',
                                                formatter: '最大值'
                                            }
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }],
                                    [{  //一条线
                                            coord: [0, 3],
                                            symbol: 'none'
                                        }, {
                                            coord: [20, 13],
                                            symbol: 'none'
                                        }]
                                ]
                            }
                            
                            
                ```
        - series[i]-bar : 柱状/条形图
            - barWidth : 柱条的宽度，不设时自适应。支持设置成相对于类目宽度的百分比。
            - barGap :柱间距离，可设固定值（如 20）或者百分比。如果想要两个系列的柱子重叠，可以设置 barGap 为 '-100%'。这在用柱子做背景的时候有用。
        - series[i]-pie : 饼图
            - hoverAnimation : 是否开启 hover 在扇区上的放大动画效果。
            - selectedMode : 选中模式，表示是否支持多个选中，默认关闭
            - selectedOffset : 选中扇区的偏移距离。
            - clockwise : 饼图的扇区是否是顺时针排布。
            - startAngle : 起始角度，支持范围[0, 360]。
            - roseType : 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
                - 'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
                - 'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
            - label/labelLine : 饼图图形上的文本标签/标签的视觉引导线样式
            
        - series[i]-scatter : 散点（气泡）图
            - coordinateSystem : 该系列使用的坐标系，[ default: 'cartesian2d' ]二维的直角坐标系
            - large : 是否开启大规模散点图的优化，在数据图形特别多的时候（>=5k）可以开启。
            
        - series[i]-effectScatter : 带有涟漪特效动画的散点（气泡）图
            - showEffectOn : 配置何时显示特效。
                - 'render' 绘制完成后显示特效。
                - 'emphasis' 高亮（hover）的时候显示特效。
            - rippleEffect : 涟漪特效相关配置。
        
        - series[i]-radar : 雷达图,依赖 radar 组件。
        
        - series[i]-funnel : 漏斗图
        
        - series[i]-gauge : 仪表盘
        
        - series[i]-heatmap : 热力图主要通过颜色去表现数值的大小，必须要配合 visualMap 组件使用。
            - coordinateSystem : 该系列使用的坐标系，可选：
                - 'cartesian2d' : 直角坐标系
                - 'geo' : 地图
                - 'calendar' : 日历 
          