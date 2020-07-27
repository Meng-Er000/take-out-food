// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import "./mock/mockServer"
import VueResource from 'vue-resource'

/*使用VueResource插件*/
Vue.use(VueResource)
axios.defaults.baseURL="/api"
Vue.prototype.$axios = axios

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
//引入mint-ui组件
import { Tabbar, TabItem } from 'mint-ui';
import { Header } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Button } from 'mint-ui';
import { Loadmore } from 'mint-ui';

Vue.component(Loadmore.name, Loadmore);

Vue.component(Button.name, Button);

Vue.component(Popup.name, Popup);


Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.component(Header.name, Header);

Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);

import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
