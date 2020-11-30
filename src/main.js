import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// 全局引入vant
import vant from "vant";
// 全局引入样式
import "vant/lib/index.css";

// 全局引入懒加载
import { Lazyload } from "vant";

Vue.use(vant);

// 使用懒加载
Vue.use(Lazyload, {
  // 未加载的占位图片
  loading: require("@/assets/img/common/placeholder.png")
});


Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
