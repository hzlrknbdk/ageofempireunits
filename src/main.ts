import Vue from "vue";
import router from "./router";
import App from "./views/App.vue";
import "bootstrap/dist/css/bootstrap.min.css"

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
