<template>
  <div class="waterfall-chart">
    <basic-container>
      <ve-waterfall :data="chartData" :settings="chartSettings"></ve-waterfall>
    </basic-container>
  </div>
</template>

<script>
import VeWaterfall from 'v-charts/lib/waterfall';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeWaterfall },
  name: 'WaterfallChart',

  data() {
    return {
      chartSettings: {
        dimension: '季度',
        metrics: '营收（美元）',
        totalName: '总营收',
      },
      chartData: {
        columns: ['季度', '营收（美元）'],
        rows: [
          { 季度: '第一季度', '营收（美元）': 5000 },
          { 季度: '第二季度', '营收（美元）': -1000 },
          { 季度: '第三季度', '营收（美元）': 3000 },
          { 季度: '第四季度', '营收（美元）': 6000 },
        ],
      },
    };
  },
};

</script>

<style>
  .waterfall-chart {
  }
</style>
