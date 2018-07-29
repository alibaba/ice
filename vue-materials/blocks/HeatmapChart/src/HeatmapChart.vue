<template>
  <div class="heatmap-chart">
    <basic-container>
      <ve-heatmap :data="chartData" :settings="chartSettings"></ve-heatmap>   
    </basic-container>
  </div>
</template>

<script>
import VeAmap from 'v-charts/lib/amap';
import VeHeatmap from 'v-charts/lib/heatmap';
import BasicContainer from '@vue-materials/basic-container';

export default {
  components: { BasicContainer, VeAmap, VeHeatmap },
  name: 'HeatmapChart',
  data() {
    return {
      chartSettings: {
        key: '4b5f2cf2cba25200cc6b68c398468899',
        type: 'amap',
        v: '1.4.3',
        amap: {
          resizeEnable: true,
          center: [120.032409, 30.285184],
          zoom: 10
        }
      },
      chartData: {
        columns: ['lat', 'lng'],
        rows: [
          { lat: 120.14322240845, lng: 30.236064370321 },
          { lat: 120.14301682797, lng: 30.236035316745 },
          { lat: 120.14138577045, lng: 30.236113748704 },
          { lat: 120.1400398833, lng: 30.235973050702 },
          { lat: 120.13893453465, lng: 30.23517220446 },
          { lat: 120.1382899739, lng: 30.234062922977 },
          { lat: 120.13265960629, lng: 30.231641351722 },
          { lat: 120.13170681763, lng: 30.229925745619 },
          { lat: 120.13119614803, lng: 30.228996846637 },
          { lat: 120.13023980134, lng: 30.228226570416 },
        ]
      }
    };
  }
};
</script>

<style>
.heatmap-chart {
}
</style>
