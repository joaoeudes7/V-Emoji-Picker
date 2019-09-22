<template>
  <div id="app">
    <VEmojiPicker
      labelSearch="Pesquisar..."
      :showSearch="true"
      :pack="dataEmojis"
      :continuousList="false"
      :emojisByRow="5"
      @select="selectEmoji"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Emoji } from "./models/Emoji";

import VEmojiPicker from "./components/VEmojiPicker";

@Component({
  components: {
    VEmojiPicker
  }
})
export default class App extends Vue {
  get dataEmojis(): any {
    return require('../data/emojis.json')['data'];
  }

  selectEmoji(emoji: Emoji) {
    console.log(emoji);
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: Segoe UI;
  font-weight: 400;
  font-display: swap;
  src: local("Segoe UI Light"),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff2)
      format("woff2"),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.woff)
      format("woff"),
    url(//c.s-microsoft.com/static/fonts/segoe-ui/west-european/light/latest.ttf)
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
