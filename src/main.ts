import Vue from "vue";
import VEmojiPicker from "./index";

Vue.config.productionTip = false;

new Vue({
  render: h => h(VEmojiPicker)
}).$mount("#app");
