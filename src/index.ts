import { PluginObject } from 'vue';
import _VEmojiPicker from './VEmojiPicker.vue';

import { categoriesDefault } from './utils/categories';
import { emojisDefault } from './utils/emojis';

import locale from './locale';

const defaultOptions = {
  i18n: {}
};

const VEmojiPicker: PluginObject<_VEmojiPicker> = {
  install: (Vue, opts: any = defaultOptions) => {
    locale.i18n(opts.i18n);

    Vue.component(_VEmojiPicker.name, _VEmojiPicker);
  }
};

// Automatic installation if Vue has been added to the global scope.
// if (typeof window !== 'undefined' && window.Vue) {
//   try {
//     window.Vue.use(VEmojiPicker)
//   } catch (error) {
//     VEmojiPicker.install(window.Vue)
//   }
// }

export {
  VEmojiPicker,
  categoriesDefault,
  emojisDefault
};

export default _VEmojiPicker;
