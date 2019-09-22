import Vue from "vue";
import App from "./App.vue";
// import { VEmojiPicker } from './index';

Vue.config.productionTip = false;
// Vue.use(VEmojiPicker);

new Vue({
  render: h => h(App)
}).$mount("#app");
