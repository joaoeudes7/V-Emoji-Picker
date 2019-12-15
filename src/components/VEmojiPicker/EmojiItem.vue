
<template>
  <span class="emoji" v-html="emoji.data" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { IEmoji } from "@/models/Emoji";

@Component({})
export default class EmojiItem extends Vue {
  @Prop({}) readonly emoji!: IEmoji;
}
</script>

<style lang="scss" scoped>
.emoji {
  display: inline-block;
  text-align: center;
  font-size: 25px;
  padding: 3px;
  line-height: 30px;
  height: 30px;
  width: 30px;
  box-sizing: content-box;
  overflow: hidden;

  cursor: pointer;

  &:hover {
    background: #00000010;
    border-radius: 8px;
  }
}
</style>
