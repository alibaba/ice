# ring-chart

简介：ring-chart

v-chart 环图

![RingChart](https://user-images.githubusercontent.com/18508817/40873835-5823c2fe-669a-11e8-9c25-d8e749884b21.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认columns第一项为维度 |
| metrics | 指标 | string | 默认columns第二项为指标 |
| dataType | 数据类型 | string | 可选值: KMB, normal, percent |
| legendLimit | legend显示数量限制 | number | legend数量过多会导致环图样式错误，限制legend最大值并且当超过此值时，隐藏legend可以解决这个问题 |
| selectedMode | 	选中模式 | string | 可选值：single, multiple，默认为false |
| hoverAnimation | 是否开启 hover 在扇区上的放大动画效果 | boolean | 默认值为true |
| radius | 环图外半径与内半径 | array | - |
| offsetY | 	纵向偏移量 | number | - |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| roseType | 显示为南丁格尔玫瑰图 | string | 默认不展示为南丁格尔玫瑰图，可设置为`'radius', 'area'` |
| label | 环图图形上的文本标签 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-pie.label) |
| labelLine | 标签的视觉引导线样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-pie.labelLine) |
| itemStyle | 图形样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-pie.itemStyle)|
| limitShowNum | 设置超过此数字时使用‘其他’代替 | number | 此时数据会按照由大到小顺序显示 |