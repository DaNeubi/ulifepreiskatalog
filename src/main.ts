import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import vuetify from './plugins/vuetify';
import fancyUnits from "@/utils/fancyUnits";
import echarts from 'vue-echarts';

Vue.config.productionTip = false
Vue.component('v-chart', echarts);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
Vue.filter("fancyUnits", fancyUnits);
