import Vue from "vue";
import VEmojiPicker from "./VEmojiPicker.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(VEmojiPicker)
}).$mount("#app");
