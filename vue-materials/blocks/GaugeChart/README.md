# gauge-chart

简介：gauge-chart

v-chart 动态仪表盘

![GaugeChart](https://user-images.githubusercontent.com/18508817/40871938-b23c73da-6677-11e8-8944-d85dfbc9de92.png)

# settings 配置项

| 配置项 | 简介 | 类型 | 备注 |
| --- | --- | --- | --- |
| dimension | 维度 | string | 默认 columns[0] |
| metrics | 指标 | string | 默认 columns[1] |
| dataType | 数据类型 | object | - |
| digit | 设置数据类型为percent时保留的位数 | number | 默认为2 |
| labelMap | 设置指标的别名 | object | - |
| seriesMap | 附加到 series 中的设置 | object | - |
| dataName | 表盘上显示的单位 | object | - |

> 备注1： 通过 seriesMap，可以为每一个仪表设置样式，具体样式的配置可以参考[文档](http://echarts.baidu.com/option.html#series-gauge)

# Q&A

> 如何去掉动态效果

请将`<script>`中的内容替换为如下内容。

```javascript
import VeGauge from 'v-charts/lib/gauge';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeGauge },
  name: 'GaugeChart',
  data() {
    return {
      chartSettings: {
        dimension: 'type',
        metrics: 'value',
      },
      chartData: {
        columns: ['type', 'a', 'b', 'value'],
        rows: [{ type: '速度', value: 40, a: 1, b: 2 }],
      },
    };
  }
};
```

> 如何还原动态效果

请将`<script>`中的内容替换为如下内容。

```javascript
import VeGauge from 'v-charts/lib/gauge';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeGauge },
  name: 'GaugeChart',
  data() {
    return {
      initValue: 40,
      chartSettings: {
        dimension: 'type',
        metrics: 'value',
      },
      chartData: {
        columns: ['type', 'a', 'b', 'value'],
        rows: [{ type: '速度', value: 40, a: 1, b: 2 }],
      },
    };
  },
  created() {
    this.runValue(5,80);
  },
  watch: {
    "initValue": function () {
      this.chartData.rows[0].value = this.initValue;
    }
  },
  methods: {
    runValue(minNum,maxNum){
      const _this =this;
      let timeOut = setTimeout(() => {
        if (_this.initValue >= minNum && _this.initValue <= maxNum) {
          _this.initValue += Math.floor((Math.random()-0.3)* 3);
          _this.runValue(5,80);
        }
        else{
          clearTimeout(timeOut);
        }
      }, 100);
    }
  }
};
```