import Vue from "vue";
// import BootstrapVue from "bootstrap-vue";
import BootstrapVue from "bootstrap-vue/dist/bootstrap-vue.esm";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import store from "./store";
import App from "./App.vue";

Vue.use(BootstrapVue);

new Vue({
  store,
  el: "#app",
  render: h => h(App)
});
