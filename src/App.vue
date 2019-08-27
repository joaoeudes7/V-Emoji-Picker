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

<style lang="scss">
@font-face {
  font-family: Twemoji;
  font-weight: 400;
  font-display: swap;
  src: url(https://ucarecdn.com/73cba3b1-b2fa-45d9-89e3-886542974668/)
    format("truetype");
}

/* @font-face {
  font-family: NotomojiColor;
  font-weight: 400;
  font-display: swap;
  src: url(https://cdn.glitch.com/61908de1-dd0a-4359-a54b-6cb6d41bb5fd%2FNotoColorEmoji.ttf?1513108808150)
    format("truetype");
} */
</style>
