import Vue from 'vue'
import App from './App.vue'
import dataV from '@jiaminghi/data-view'
import * as echarts from 'echarts';
import router from './router'
import axios from 'axios'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false
Vue.use(dataV);
Vue.use(Antd);
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$url = 'http://192.168.0.171:30890'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
