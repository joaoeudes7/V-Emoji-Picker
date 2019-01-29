<template>
  <div>
    <EmojiPicker :pack="pack" />
  </div>
</template>

<script>
import EmojiPicker from './index.js';
import packData from '../data/emojis.json';

export default {
  name: 'Demo',
  components: { EmojiPicker },
  data: () => ({
    pack: packData
  })
}
</script>

<style>

</style>
