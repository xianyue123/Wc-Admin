import 'babel-polyfill'
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueProgressBar from "vue-progressbar";
import axios from 'axios';

import App from './App'

import {mapGetters, mapActions, mapMutations} from 'vuex'

Vue.use(axios);
Vue.use(ElementUI)

Vue.config.productionTip = false

//路由进度条
Vue.use(VueProgressBar, {
  color: '#33CC66',
  failedColor: '#FF0000',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.8s'
  },
  autoRevert: true,
  location: 'top',
  inverse: false
})

axios.defaults.baseURL = 'http://localhost:8025';

axios.defaults.headers.common['Authorization'] = window.localStorage.getItem('ppvserver-token');

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';


var instance = axios.create({
  baseURL:'http://localhost:8025',
  timeout: 5000,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  withCredentials: false
});

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
instance.interceptors.request.use(function (config) {  //配置发送请求的信息
  config.headers.Authorization = window.localStorage.getItem('ppvserver-token');


  // Indicator.open({
  //   text: '加载中...',
  //   spinnerType: 'fading-circle'
  // });


  return config;
}, function (error) {

  //Indicator.close();

});

instance.interceptors.response.use(function (response) { //配置请求回来的信息
  window.localStorage.setItem('ppvserver-token',response.config.headers.Authorization);
  
  //Indicator.close();
  
  return response;
}, function (error) {
  
  //Indicator.close();
  
  return Promise.reject(error);
});

Vue.prototype.$http = instance


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  created(){
    this.$router.push('/');
  },
})
