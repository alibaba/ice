import Vue from 'vue';
import Block from '../src/index';

Vue.config.productionTip = false;

new Vue({
  el: '#mountNode',
  components: { Block },
  template: '<div class="vue-demo-layout"><Block/></div>',
});
