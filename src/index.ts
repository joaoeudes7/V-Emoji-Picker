import locale from './locale';
import { categoriesDefault } from './utils/categories';
import { emojisDefault } from './utils/emojis';
import VEmojiPicker from './VEmojiPicker.vue';
import { App } from 'vue';

const defaultOptions = {
  i18n: {}
};

const install = function(app:App, opts: any = defaultOptions) {
  locale.i18n(opts.i18n);
  app.component("VEmojiPicker", VEmojiPicker);
}

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

export default install;
