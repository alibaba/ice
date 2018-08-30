# waterfall-chart

简介：waterfall-chart

v-chart 瀑布图

![WaterfallChart](https://user-images.githubusercontent.com/6414178/44137279-61c8508a-a0a2-11e8-9a66-28f15c6038a6.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认columns第一项为维度 |
| metrics | 指标 | string | 默认columns第二项为指标 |
| dataType | 数据类型 | string | 可选值: KMB, normal, percent |
| totalNum | 总量 | number | 默认瀑布图总量为所有数据的和 |
| totalName | 总量的显示文案 | string | 默认显示总计 |
| remainName | 剩余的显示文案 | string | 默认显示其他 |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
