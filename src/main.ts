import Vue from "vue";
import AppTest from "./AppTestUi.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(AppTest)
}).$mount("#app");
