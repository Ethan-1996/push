import Vue from 'vue'
import App from './App.vue'
import router from './router'




//引入重置样式文件
import './stylesheets/reset.css';

// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//引入md5 加密
import md5 from 'js-md5';
Vue.prototype.$md5 = md5;



import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}



const Header = "https://www.taoliutui.com"

// const Header = "/api"
Vue.prototype.$header = Header;



Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
