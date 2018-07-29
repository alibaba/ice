<template>
  <div class="normal-toggle-chart">
    <basic-container>
      <ve-line :data="chartData" :toolbox="toolbox"></ve-line>
    </basic-container>
  </div>
</template>

<script>
import 'echarts/lib/component/toolbox';
import VeLine from 'v-charts/lib/line';
import VeBar from 'v-charts/lib/bar';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeLine,VeBar},
  name: 'NormalToggleChart',
  data() {
    return {
      toolbox: {
        feature: {
          magicType: { type: ['line', 'bar']},
          saveAsImage: {
            name: 'v-chart-temp'
          }
        }
      },
      initIndex: 0,
      chartData: {
        columns: ['日期', '访问用户'],
        rows: [
          { 日期: '1月1日', 访问用户: 1523 },
          { 日期: '1月2日', 访问用户: 1223 },
          { 日期: '1月3日', 访问用户: 2123 },
          { 日期: '1月4日', 访问用户: 4123 },
          { 日期: '1月5日', 访问用户: 3123 },
          { 日期: '1月6日', 访问用户: 7123 },
        ]
      }
    };
  }
};

</script>

<style>
  .normal-toggle-chart {

  }
</style>
