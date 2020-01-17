import { PluginObject } from 'vue';

import _VEmojiPicker from './VEmojiPicker.vue';
import EmojiItem from './components/EmojiItem.vue';

const VEmojiPicker: PluginObject<_VEmojiPicker> = {
  install(Vue, options) {
    Vue.component(_VEmojiPicker.name, _VEmojiPicker);
  }
};

if (typeof window !== 'undefined') {
  if (!window.Vue) window.Vue = require('vue').default;

  (window as any).Vue.use(VEmojiPicker)
}

export { VEmojiPicker, EmojiItem };
export default _VEmojiPicker;
