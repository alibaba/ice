# pie-chart

简介：pie-chart

v-chart 饼图

![PieChart](https://user-images.githubusercontent.com/18508817/40873980-252d4850-669c-11e8-9e46-b44212c6f073.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认columns第一项为维度 |
| metrics | 指标 | string | 默认columns第二项为指标 |
| dataType | 数据类型 | string | 可选值: KMB, normal, percent |
| legendLimit | legend显示数量限制 | number | legend数量过多会导致饼图样式错误，限制legend最大值并且当超过此值时，隐藏legend可以解决这个问题 |
| selectedMode | 	选中模式 | string | 可选值：single, multiple，默认为false |
| hoverAnimation | 是否开启 hover 在扇区上的放大动画效果 | boolean | 默认值为true |
| radius | 饼图半径 | number | - |
| offsetY | 	纵向偏移量 | number | - |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| roseType | 显示为南丁格尔玫瑰图 | string | 默认不展示为南丁格尔玫瑰图，可设置为`'radius', 'area'` |
| label | 饼图图形上的文本标签 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-pie.label) |
| labelLine | 标签的视觉引导线样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-pie.labelLine) |
| itemStyle | 图形样式 | object | 内容参考[文档](http://echarts.baidu.com/option.html#series-pie.itemStyle)|
| level | 多圆饼图时设置 | array | - |
| limitShowNum | 设置超过此数字时使用‘其他’代替 | number | 此时数据会按照由大到小顺序显示 |

> 备注1. level 的值接受二维数组，例如：`[['a', 'b'], ['c', 'd']]`, 表示的含义是内层展示的是维度中的`'a', 'b'`的指标加在一起组成的饼图，外层为`'c', 'd'`的指标加在一起组成的环图。