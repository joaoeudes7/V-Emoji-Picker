import Vue from 'vue';

import VEmojiPicker from './components/VEmojiPicker.vue';
import Categories from './components/Categories.vue';
import Emojis from './components/Emojis.vue';
import Helper from './components/Helper.vue';
import YSvg from './components/VSvg.vue';

export const Components = {
  VEmojiPicker,
  Categories,
  Emojis,
  Helper,
  YSvg
}

Object.keys(Components).forEach(name => {
  Vue.use(name, Components[name]);
})

export default VEmojiPicker;
