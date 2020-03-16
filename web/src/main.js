import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "mand-mobile/components/_style/global.styl";
import "normalize.css";
import axios from 'axios'

import { Swiper, SwiperItem, TabBar, Icon, Field, DetailItem, Button, Amount, Cashier } from 'mand-mobile'

Vue.component(Swiper.name, Swiper);
Vue.component(SwiperItem.name, SwiperItem);
Vue.component(TabBar.name, TabBar);
Vue.component(Icon.name, Icon);
Vue.component(Field.name, Field);
Vue.component(DetailItem.name, DetailItem);
Vue.component(Button.name, Button);
Vue.component(Amount.name, Amount);
Vue.component(Cashier.name, Cashier);

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
