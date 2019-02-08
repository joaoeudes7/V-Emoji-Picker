<template>
  <div id="app">
    <VEmojiPicker :pack="pack" @select="selectEmoji" />
  </div>
</template>

<script>
import VEmojiPicker from '../dist/v-emoji-picker.umd.js';
import packData from '../data/emojis.json';

export default {
  name: 'Demo',
  components: {
    VEmojiPicker
  },
  data: () => ({
    pack: packData
  }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>
