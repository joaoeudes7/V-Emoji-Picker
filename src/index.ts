import { PluginObject } from 'vue';

import _VEmojiPicker from './VEmojiPicker.vue';
import EmojiItem from './components/EmojiItem.vue';

import { categoriesDefault } from './utils/categories';
import { emojisDefault } from './utils/emojis';

const VEmojiPicker: PluginObject<_VEmojiPicker> = {
  install(Vue, options) {
    Vue.component(_VEmojiPicker.name, _VEmojiPicker);
  }
};

export { VEmojiPicker, categoriesDefault, emojisDefault };
export default _VEmojiPicker;
