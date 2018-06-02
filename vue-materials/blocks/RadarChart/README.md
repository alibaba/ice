# radar-chart

简介：radar-chart

v-chart 雷达图

![RadarChart](https://user-images.githubusercontent.com/18508817/40873504-a9e4cf68-6693-11e8-8ee4-93ba91958204.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认columns第一项为维度 |
| metrics | 指标 | array | 默认columns第二项起为指标 |
| dataType | 数据类型 | object | 可选值: KMB, normal, percent |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| label | 图形上的文本标签 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-radar.label) |
| itemStyle | 折线拐点标志的样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-radar.itemStyle) |
| lineStyle | 线条样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-radar.lineStyle) |
| areaStyle | 区域填充样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-radar.areaStyle)  |

> 备注：dataType中直接设置对应维度的数据类型，例如示例的`{ '占比': 'percent' }`，即将占比数据设置为百分比类型