# funnel-chart

简介：funnel-chart

v-chart 漏斗图

![FunnelChart](https://user-images.githubusercontent.com/18508817/40873590-ae08fab8-6695-11e8-90dd-c600d8f413c6.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认columns第一项为维度 |
| metrics | 指标 | string | 默认columns第二项为指标 |
| dataType | 数据类型 | string | 可选值: KMB, normal, percent |
| sequence | 数据显示顺序 | array | 默认按照数据大小顺序 |
| ascending | 是否显示为金字塔 | boolean | 默认为false |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| label | 设置文本标签样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-funnel.label) |
| labelLine | 设置标签的视觉引导线样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-funnel.labelLine) |
| itemStyle | 设置图形样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-funnel.itemStyle) |