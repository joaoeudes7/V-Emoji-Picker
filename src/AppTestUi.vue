<template>
  <div>
    <div>
      <VEmojiPicker :customEmojis="emojis" />
    </div>
    <button @click="changeEmojis">Change</button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

import { VEmojiPicker, emojisDefault } from "./index";

Vue.use(VEmojiPicker);

@Component({})
export default class AppTestUi extends Vue {
  private emojis = emojisDefault;

  changeEmojis() {
    this.emojis = emojisDefault.slice(0, 8);
  }
}
</script>

<style lang='scss' scoped>
</style>
