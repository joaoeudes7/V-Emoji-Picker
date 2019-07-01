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
import VEmojiPicker from "./components/VEmojiPicker";
import packData from "../data/emojis.js";

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
