<template>
  <div class="funnel-chart">
    <basic-container>
      <ve-funnel :data="chartData" :settings="chartSettings"></ve-funnel>
    </basic-container>
  </div>
</template>

<script>
import VeFunnel from 'v-charts/lib/funnel';
import BasicContainer from '@vue-materials/basic-container'

export default {
  components: { BasicContainer,VeFunnel },
  name: 'FunnelChart',
  data() {
      return {
        chartSettings : {dataType: 'percent'},
        chartData: {
          columns: ['状态', '数值'],
          rows: [
            { '状态': '展示', '数值': 0.9 },
            { '状态': '访问', '数值': 0.6 },
            { '状态': '点击', '数值': 0.3 },
            { '状态': '订单', '数值': 0.1 }
          ]
        }
      }
  }
}

</script>

<style>
  .funnel-chart {

  }
</style>
