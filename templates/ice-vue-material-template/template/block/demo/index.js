import Vue from 'vue';
import Block from '../src/index';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Block),
}).$mount('#vue-demo-layout')