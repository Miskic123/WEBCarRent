import Vue from 'vue'
import App from './App.vue'
import VueToastr from 'vue-toastr'
import router from './routes'
import VueRouter from 'vue-router'

Vue.use(VueToastr);
Vue.use(VueRouter);

const routerInstance = new VueRouter({
  mode: "history",
  routes: router
});

new Vue({
  el: "#app",
  router: routerInstance,
  render: (h) => h(App),
});
