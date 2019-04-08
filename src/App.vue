<template>
  <div id="app">
    <VEmojiPicker
      :pack="pack"
      labelSearch="Pesquisar..."
      @select="selectEmoji"
      :continuousList="true"
    />
  </div>
</template>

<script>
import VEmojiPicker from "./components/VEmojiPicker";
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
