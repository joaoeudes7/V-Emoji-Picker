import Vue from "vue";
import VEmojiPicker from './components/VEmojiPicker/VEmojiPicker.vue';

const Components = {
  VEmojiPicker
}

Object.keys(Components).forEach(name => {
  Vue.use(name, Components[name])
})

export default VEmojiPicker;
