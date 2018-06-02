<template>
  <div class="pie-chart">
    <basic-container>
      <ve-pie :data="chartData" :settings="chartSettings"></ve-pie>
    </basic-container>
  </div>
</template>

<script>
import VePie from 'v-charts/lib/pie';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VePie },
  name: 'PieChart',
  data() {
    return {
      chartSettings: {
        level: [
          ['1/1', '1/2', '1/3'],
          ['1/4', '1/5']
        ]
      },
      chartData: {
          columns: ['日期', '访问用户'],
          rows: [
            { '日期': '1/1', '访问用户': 1393 },
            { '日期': '1/2', '访问用户': 3530 },
            { '日期': '1/3', '访问用户': 2923 },
            { '日期': '1/4', '访问用户': 1723 },
            { '日期': '1/5', '访问用户': 3792 },
            { '日期': '1/6', '访问用户': 4593 }
          ]
      }
    };
  },
};
</script>

<style>
.pie-chart {
}
</style>
