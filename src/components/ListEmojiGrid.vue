<template>
  <div class="grid-emojis" :style="gridDynamic">
    <EmojiItem
      v-for="(emoji, index) in emojis"
      :key="index"
      :emoji="emoji"
      :size="emojiSize"
      :withBorder="emojiWithBorder"
      @click.native="onSelect(emoji)"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

import EmojiItem from "./EmojiItem.vue";
import CategoryLabel from "./CategoryLabel.vue";
import { Emit, Prop } from "vue-property-decorator";
import { Emoji } from "@/models/Emoji";

@Component({
  components: {
    EmojiItem,
    CategoryLabel,
  },
})
export default class ListEmojiGrid extends Vue {
  @Prop({ required: true }) emojis!: Emoji[];
  @Prop({}) emojiWithBorder!: boolean;
  @Prop({}) emojiSize!: number;
  @Prop({ required: true }) emojisByRow!: number;

  get gridDynamic() {
    const percent = 100 / this.emojisByRow;
    return {
      gridTemplateColumns: `repeat(${this.emojisByRow}, ${percent}%)`,
    };
  }

  @Emit("select")
  onSelect(emoji: Emoji) {
    return emoji;
  }
}
</script>

<style scoped>
.grid-emojis {
  display: grid;
  margin: 5px 0;
  justify-items: center;

  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
