
<template>
  <span :class="['emoji', { 'border': withBorder } ]" :content="emoji?.data" />
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";
import { Options } from 'vue-class-component';
import { IEmoji } from "@/models/Emoji";

@Options({})
export default class EmojiItem extends Vue {
  @Prop({}) emoji!: IEmoji;
  @Prop({}) withBorder!: boolean;
}
</script>

<style lang="scss" scoped>
.emoji {
  $padding:2px;
  display: inline-block;
  box-sizing: content-box;
  overflow: hidden;
  transition: transform 0.2s;
  cursor: pointer;
  font-size: var(--emojiSize);
  padding: $padding;
  min-width: calc(var(--emojiSize) + #{$padding * 2} + 6px);
  text-align: center;
  &::before {
    content:attr(content);
    display: inline-block;
    transform: translate(-0%, -3%);
  }
  &:hover {
    transform: scale(1.05);
  }
  &:last-child {
    margin-right: auto;
  }
}

.border:hover {
  background: #00000030;
  border-radius: 8px;
}
</style>
