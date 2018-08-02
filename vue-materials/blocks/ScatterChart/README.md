# scatter-chart

简介：scatter-chart

v-chart 散点图

![ScatterChart](https://user-images.githubusercontent.com/18508817/40872375-eca28c00-667f-11e8-9af9-d925384e3553.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认 columns[0] |
| metrics | 指标 | array | 默认 [columns[0], columns[1]] |
| dataType | 数据类型 | object | - |
| xAxisType | x轴类型 | string | 可选值: category, value, time, log |
| xAxisName | x轴标题 | string | - |
| yAxisName | y轴标题 | string | - |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| labelMap | 设置指标的别名 | object | - |
| legendName | 设置图表上方图例的别名 | object | - |
| tooltipTrigger | 提示框的触发方式 | string | 可选值: item, axis |
| axisVisible | 是否显示坐标轴 | boolean | - |
| symbolSizeMax | 气泡最大值 | number | 默认为50 |
| symbol | 标记的图形 | string | 内容参考[文档](http://echarts.baidu.com/option.html#series-scatter.symbol) |
| symbolSize | 标记的大小 | number, array, Function | 内容参考[文档](http://echarts.baidu.com/option.html#series-scatter.symbolSize) |
| symbolRotate | 标记的旋转角度 | number | 内容参考[文档](http://echarts.baidu.com/option.html#series-scatter.symbolRotate) |
| symbolOffset | 标记相对于原本位置的偏移 | array | 内容参考[文档](http://echarts.baidu.com/option.html#series-scatter.symbolOffset) |
| cursor | 鼠标悬浮时在图形元素上时鼠标的样式 | string | 内容参考[文档](http://echarts.baidu.com/option.html#series-scatter.cursor) |
| scale | 是否是脱离 0 值比例 | boolean | - |
| min | y轴最小值 | number | - |
| max | y轴最大值 | number | - |
