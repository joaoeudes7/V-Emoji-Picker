<template>
  <div>
    <VEmojiPicker :pack="pack" />
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
  moutend() {
    console.log(VEmojiPicker)
  },
  data: () => ({
    pack: packData
  })
}
</script>

<style>

</style>
