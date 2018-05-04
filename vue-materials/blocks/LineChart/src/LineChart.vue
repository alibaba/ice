<template>
  <div className="line-chart">
    <basic-container>
      <ve-line :data="chartData" :settings="chartSettings"></ve-line>
    </basic-container>
  </div>
</template>

<script>
import VeLine from 'v-charts/lib/line'
import BasicContainer from '@vue-materials/basic-container'

export default {
  components: { VeLine, BasicContainer },
  name: 'LineChart',

  data() {
    return {
      chartData: {
        columns: ['日期', '成本', '利润', '占比', '其他'],
        rows: [
          { '成本': 1523, '日期': '1月1日', '利润': 1523, '占比': 0.12, '其他': 100 },
          { '成本': 1223, '日期': '1月2日', '利润': 1523, '占比': 0.345, '其他': 100 },
          { '成本': 2123, '日期': '1月3日', '利润': 1523, '占比': 0.7, '其他': 100 },
          { '成本': 4123, '日期': '1月4日', '利润': 1523, '占比': 0.31, '其他': 100 },
          { '成本': 3123, '日期': '1月5日', '利润': 1523, '占比': 0.12, '其他': 100 },
          { '成本': 7123, '日期': '1月6日', '利润': 1523, '占比': 0.65, '其他': 100 }
        ]
      },
      chartSettings: {
        metrics: ['成本', '利润'],
        dimension: ['日期']
      }
    }
  }
}

</script>

<style>
  .line-chart {

  }
</style>
