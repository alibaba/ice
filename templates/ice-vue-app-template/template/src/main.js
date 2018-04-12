import Vue from 'vue';
import App from './App.vue';
import router from './routes';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
