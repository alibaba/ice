<template>
  <div className="histogram-chart">
    <basic-container>
      <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
    </basic-container>
  </div>
</template>

<script>
import VeHistogram from 'v-charts/lib/histogram'
import BasicContainer from '@vue-materials/basic-container'

export default {
  components: { VeHistogram, BasicContainer },
  name: 'HistogramChart',

  data() {
    return {
      chartData: {
        columns: ['日期', '成本', '利润', '占比', '其他'],
        rows: [
          { '日期': '1月1日', '成本': 1523, '利润': 1523, '占比': 0.12, '其他': 100 },
          { '日期': '1月2日', '成本': 1223, '利润': 1523, '占比': 0.345, '其他': 100 },
          { '日期': '1月3日', '成本': 2123, '利润': 1523, '占比': 0.7, '其他': 100 },
          { '日期': '1月4日', '成本': 4123, '利润': 1523, '占比': 0.31, '其他': 100 }
        ]
      }
    }
  }
}
</script>

<style>
  .histogram-chart {

  }
</style>
