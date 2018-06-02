<template>
  <div class="radar-chart">
    <basic-container>
      <ve-radar :data="chartData" :settings="chartSettings"></ve-radar>
    </basic-container>
  </div>
</template>

<script>
import VeRadar from 'v-charts/lib/radar';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer,VeRadar },
  name: 'RadarChart',
  data() {
    return {
      chartSettings: {
        labelMap: {
          日期: 'date',
          访问用户: 'PV',
          下单用户: 'Order',
          下单率: 'orderRate',
        }
      },
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { 日期: '1/1', 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: '1/2', 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: '1/3', 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: '1/4', 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: '1/5', 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: '1/6', 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ]
      }
    };
  },
};
</script>

<style>
.radar-chart {
}
</style>
