import VEmojiPicker from './components/VEmojiPicker';

export default {
  install: (Vue: any) => Vue.use("VEmojiPicker", VEmojiPicker)
}

if (typeof window !== 'undefined' && window.Vue) {
  (window.Vue as any).use(VEmojiPicker)
}
