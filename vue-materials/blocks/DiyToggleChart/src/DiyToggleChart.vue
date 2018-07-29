<template>
  <div class="diy-toggle-chart">
    <basic-container>
      <el-row>
        <el-button type="primary" plain @click="changeType" size="mini">自定义切换图表类型</el-button>
        <span>{{'当前图表类型是' + chartSettings.type + '图'}}</span>
      </el-row>
      <ve-chart :data="chartData" :toolbox="toolbox" :settings="chartSettings"></ve-chart>
    </basic-container>
  </div>
</template>

<script>
import VeChart from 'v-charts/lib/chart';
import VeLine from 'v-charts/lib/line';
import VeHistogram from 'v-charts/lib/histogram';
import VeBar from 'v-charts/lib/bar';
import VePie from 'v-charts/lib/pie';
import VeRing from 'v-charts/lib/ring';
import VeWaterfall from 'v-charts/lib/waterfall';
import VeFunnel from 'v-charts/lib/funnel';

import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeLine, VeHistogram,VeBar, VePie, VeRing,VeWaterfall,VeFunnel,VeChart },
  name: 'DiyToggleChart',
  data() {
    let _this = this;
    _this.typeArr = ['line', 'histogram','bar', 'pie', 'ring','waterfall','funnel'];
    return {
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
      },
      chartSettings: { type: _this.typeArr[0] }
    };
  },
  watch: {
    initIndex: function() {
      this.chartSettings.type = this.typeArr[this.initIndex];
    }
  },
  methods: {
    changeType: function() {
      this.initIndex += 1;
      if (this.initIndex >= this.typeArr.length) {
        this.initIndex = 0;
      }
    }
  },
};
</script>

<style>
  .diy-toggle-chart {

  }
</style>
