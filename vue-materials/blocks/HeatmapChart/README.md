# heatmap-chart

简介：heatmap-chart

v-chart 高德地图热力图

![HeatmapChart](https://user-images.githubusercontent.com/18508817/40877885-8890d22c-66ba-11e8-86bd-f1ea0806f2fd.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| type | 热力图的类型 | string | 可选值：`cartesian`(默认值，直角坐标系), `map`(地图)，`bmap`(百度地图) |
| xAxisList | x 轴数据 | array | 默认取数据中的数据中的第一维度的数据 |
| yAxisList | y 轴数据 | array | 默认取数据中的数据中的第二维度的数据 |
| dimension | 维度 | array | 默认为 [columns[0], columns[1]] |
| metrics | 指标 | string | 默认为 columns[2] |
| dataType | 数据类型 | string | 可选值: KMB, normal, percent |
| min | visualMap 中的最小值 | number | 默认取指标中最小的数据 |
| max | visualMap 中的最大值 | number | 默认取指标中最大的数据 |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| key | 百度地图 access_key | string | 可[由此](http://lbsyun.baidu.com/apiconsole/key)获取 |
| bmap | 百度地图配置项 | object | 参考[文档](https://github.com/ecomfe/echarts/tree/master/extension/bmap#使用)配置 |
| geo |  地图配置项 |  object | 参考[文档](http://echarts.baidu.com/option.html#geo) |
| position | 地图类型 | string | 默认为 `'china'` |
| positionJsonLink | 地图数据源 | string | - |
| beforeRegisterMap | 地图数据注册前执行的函数 | Function | 参数为地图数据，需返回地图数据 |
| beforeRegisterMapOnce | 地图数据注册前执行的函数(仅执行一次) | Function | 参数为地图数据，需返回地图数据 |
| specialAreas | 地图中的位置配置 | object | 将地图中的部分区域缩放到合适的位置，可以使得整个地图的显示更加好看, 用法参考[文档](http://echarts.baidu.com/api.html#echarts.registerMap) |
| mapURLProfix | 位置请求的 URL 前缀 | string | 默认为 `https://unpkg.com/echarts@3.6.2/map/json/` |
| pointSize | 点大小 | number | 默认为 10 |
| blurSize | 模糊大小 | number | 默认为 5 |
| heatColor | visualMap 中的最大值颜色区间 | array | - |
| yAxisName | y 轴名称 | string | - |
| xAxisName | x 轴名称 | string | - |

> 备注：当不指定指标时，指标的值默认为1。
