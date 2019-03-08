import Vue from 'vue';
import Block from '../src/index';

Vue.config.productionTip = false;

new Vue({
  el: '#vue-demo-layout',
  components: { Block },
  template: '<Block/>',
});
