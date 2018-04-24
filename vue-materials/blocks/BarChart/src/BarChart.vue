<template>
  <div className="bar-chart">
    <basic-container>
      <ve-bar :data="chartData" :settings="chartSettings"></ve-bar>
    </basic-container>
  </div>
</template>

<script>
import VeBar from 'v-charts/lib/bar'
import BasicContainer from '@vue-materials/basic-container'

export default {
  components: { VeBar, BasicContainer },
  name: 'BarChart',

  data() {
    return {
      chartData: {
        columns: ['日期', '销售额-1季度', '销售额-2季度', '占比', '其他'],
        rows: [
          { '日期': '1月1日', '销售额-1季度': 1523, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
          { '日期': '1月2日', '销售额-1季度': 1223, '销售额-2季度': 1523, '占比': 0.345, '其他': 100 },
          { '日期': '1月3日', '销售额-1季度': 2123, '销售额-2季度': 1523, '占比': 0.7, '其他': 100 },
          { '日期': '1月4日', '销售额-1季度': 4123, '销售额-2季度': 1523, '占比': 0.31, '其他': 100 },
          { '日期': '1月5日', '销售额-1季度': 3123, '销售额-2季度': 1523, '占比': 0.12, '其他': 100 },
          { '日期': '1月6日', '销售额-1季度': 7123, '销售额-2季度': 1523, '占比': 0.65, '其他': 100 }
        ]
      },
      chartSettings: {
        dimension: ['日期'],
        metrics: [ '销售额-1季度', '销售额-2季度', '占比'],
        axisSite: {
          top: ['占比']
        },
        xAxisType: ['KMB', 'percent'],
        xAxisName: ['销售额', '占比'],
        stack: {
          '销售额': ['销售额-1季度', '销售额-2季度']
        }
      }
    }
  }
}
</script>

<style>
  .bar-chart {

  }
</style>
