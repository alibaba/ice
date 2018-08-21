<template>
  <div class="map-toggle-chart">
    <basic-container>
      <el-row>
        <el-button type="primary" plain @click="changeType" size="mini">切换地图类型</el-button>
        <el-button type="primary" plain @click="setAmapTheme" size="mini" v-show="chartSettings.type =='amap'" >切换地图主题</el-button>        
        <span>{{'当前地图类型是' + chartSettings.type}}</span>
      </el-row>
      <ve-amap :settings="chartSettings" v-show="chartSettings.type =='amap'" :after-set-option-once="addAmap"></ve-amap>
      <ve-bmap :settings="chartSettings" v-show="chartSettings.type =='bmap'" :after-set-option-once="afterSet"></ve-bmap>
    </basic-container>
  </div>
</template>

<script>
import VeBmap from 'v-charts/lib/bmap';
import VeAmap from 'v-charts/lib/amap';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeBmap, VeAmap },
  name: 'MapToggleChart',
  data() {
    return {
      initIndex: 0,
      amapTheme: ['normal', 'dark', 'light', 'fresh'],
      chartSettings: {
        key: '4b5f2cf2cba25200cc6b68c398468899',
        bmap: {
          center: [120.032409, 30.285184],
          zoom: 14,
          roam: true,
          mapStyle: {}
        },
        type: 'amap',
        v: '1.4.3',
        amap: {
          resizeEnable: true,
          center: [120.032409, 30.285184],
          zoom: 10
        }
      },
      amap: {}
    };
  },
  methods: {
    changeType: function() {
      const isAmap = this.chartSettings.type === 'amap';
      this.chartSettings.type = isAmap ? 'bmap' : 'amap';
    },
    afterSet: function(echarts) {
      const bmap = echarts
        .getModel()
        .getComponent('bmap')
        .getBMap();
      bmap.addControl(new window.BMap.MapTypeControl());
    },
    addAmap: function(echarts) {
      this.amap = echarts
        .getModel()
        .getComponent('amap')
        .getAMap();
    },
    setAmapTheme: function() {
      const _this = this;
      if (!!_this.amap) {
        _this.initIndex += 1;
        if (_this.initIndex >= _this.amapTheme.length) {
          _this.initIndex = 0;
        }
        let tempTheme = this.amapTheme[_this.initIndex];
        this.amap.setMapStyle(tempTheme);
      }
    }
  }
};
</script>

<style>
.map-toggle-chart {
}
</style>
