import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

import VueGoogleMap from 'vuejs-google-maps';
import 'vuejs-google-maps/dist/vuejs-google-maps.css';

Vue.use(VueGoogleMap, {
  load: {
    apiKey: '',
    libraries: [/* rest of libraries */]
  }
});

import VueTree from '@ssthouse/vue-tree-chart';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css';

Vue.config.productionTip = false;

Vue.component('vue-tree', VueTree);
Vue.component('vue-slider', VueSlider);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
