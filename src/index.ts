import { PluginObject } from 'vue';
import Component from './components/VEmojiPicker';

const VEmojiPicker: PluginObject<Component> = {
  install(Vue, options) {
    Vue.component(Component.name, Component);
  }
};

if (typeof window !== 'undefined' && (window as any).Vue) {
  (window as any).Vue.use(VEmojiPicker)
}

export { VEmojiPicker };
export default Component;
