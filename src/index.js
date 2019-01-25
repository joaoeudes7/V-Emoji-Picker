import EmojiPicker from './components/EmojiPicker.vue';

const Components = {
  EmojiPicker
}

Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name]);
});

export default Components;
