<template>
  <div class="ring-chart">
    <basic-container>
      <ve-ring :data="chartData" :settings="chartSettings"></ve-ring>
    </basic-container>
  </div>
</template>

<script>
import VeRing from 'v-charts/lib/ring';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer,VeRing },
  name: 'RingChart',
  data() {
    return {
      chartSettings: {
        dimension: '日期',
        metrics: '访问用户',
      },
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { 日期: '1/1', 访问用户: 1393 },
          { 日期: '1/2', 访问用户: 3530 },
          { 日期: '1/3', 访问用户: 2923 },
          { 日期: '1/4', 访问用户: 1723 },
          { 日期: '1/5', 访问用户: 3792 },
          { 日期: '1/6', 访问用户: 4593 },
        ]
      }
    };
  },
};
</script>

<style>
.ring-chart {
}
</style>
