<template>
  <div id="app">
    <VEmojiPicker
      labelSearch="Pesquisar..."
      :showSearch="false"
      :pack="pack"
      :continuousList="true"
      @select="selectEmoji"
    />
  </div>
</template>

<script>
import VEmojiPicker from "../dist/v-emoji-picker.umd.min.js";
import packData from "../data/emojis.json";

export default {
  name: "Demo",
  components: {
    VEmojiPicker
  },
  data: () => ({
    pack: packData
  }),
  methods: {
    selectEmoji(emoji) {
      // eslint-disable-next-line no-console
      console.log(emoji);
    }
  }
};
</script>
