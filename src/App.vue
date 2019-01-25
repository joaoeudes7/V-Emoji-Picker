<template>
  <div>
    <EmojiPicker :pack="pack" />
  </div>
</template>

<script>
import EmojiPicker from './components/EmojiPicker';
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
