import { PluginObject } from 'vue';
import _VEmojiPicker from './VEmojiPicker.vue';

const VEmojiPicker: PluginObject<_VEmojiPicker> = {
  install(Vue, options) {
    Vue.component(_VEmojiPicker.name, _VEmojiPicker);
  }
};

if (typeof window !== 'undefined') {
  if (!window.Vue) window.Vue = require('vue').default;

  (window as any).Vue.use(VEmojiPicker)
}

export { VEmojiPicker };
export default _VEmojiPicker;
