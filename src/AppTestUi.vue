<template>
  <div>
    <div>
      <VEmojiPicker :customEmojis="emojis" :continuousList="true" v-if="visible" :dark="true" />
    </div>
    <button @click="changeEmojis">Change</button>
    <button @click="changeVisibleEmojis">Toogle View</button>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from "vue-property-decorator";

import VEmojiPicker, { emojisDefault } from "./../lib/v-emoji-picker.cjs";
// import { VEmojiPicker, emojisDefault } from "./index";

Vue.use(VEmojiPicker);

@Component({
  name: "AppTestUI",
  components: {
    // VEmojiPicker
  }
})
export default class AppTestUi extends Vue {
  private emojis = emojisDefault;

  private visible = true;

  changeEmojis() {
    this.emojis = emojisDefault.slice(0, 8);
  }

  changeVisibleEmojis() {
    this.visible = !this.visible;
  }
}
</script>

<style lang='scss' scoped>
</style>
