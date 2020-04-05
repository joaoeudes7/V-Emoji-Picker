
<template>
  <span :class="['emoji', { 'border': withBorder } ]" :style="styleSize" v-html="emoji.data" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IEmoji } from "@/models/Emoji";

@Component({})
export default class EmojiItem extends Vue {
  @Prop({}) emoji!: IEmoji;
  @Prop({}) size!: number;
  @Prop({}) withBorder!: boolean;

  get styleSize() {
    return {
      fontSize: `${this.size - 5}px`,
      lineHeight: `${this.size}px`,
      height: `${this.size}px`,
      width: `${this.size}px`
    };
  }
}
</script>

<style lang="scss" scoped>
.emoji {
  font-family: apple color emoji, segoe ui emoji, noto color emoji,
    android emoji, emojisymbols, emojione mozilla, twemoji mozilla,
    segoe ui symbol, Twemoji, NotomojiColor, Notomoji, Symbola, Noto,
    Segoe UI Emoji, OpenSansEmoji, monospace;
  display: inline-block;
  text-align: center;
  padding: 3px;
  box-sizing: content-box;
  overflow: hidden;
  transition: transform 0.2s;

  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
}

.border:hover {
  background: #00000010;
  border-radius: 8px;
}
</style>
