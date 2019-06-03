import Vue from 'vue';
import App from './App';
import ExampleComponents from '../src/index';

Vue.use(ExampleComponents);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#vue-demo-layout');