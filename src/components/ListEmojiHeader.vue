<template>
  <div ref="list-header" class="container-emoji">
    <div
      v-for="(emojis, categoryId) in emojisByCategory"
      :key="categoryId"
    >
      <template v-if="emojis.length">
        <CategoryLabel
          v-show="emojis.length"
          :name="categoryId"
          :ref="categoryId"
        />
        <ListEmojiGrid v-bind="{ emojis, category: categoryId, emojiWithBorder, emojiSize, emojisByRow }" @onSelect="onSelect" />
      </template>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Emit, Prop, Watch } from "vue-property-decorator";

import CategoryLabel from "./CategoryLabel.vue";
import ListEmojiGrid from "./ListEmojiGrid.vue";

import { MapEmojis } from "@/models/MapEmojis";
import { Emoji } from "@/models/Emoji";

@Component({
  components: {
    ListEmojiGrid,
    CategoryLabel,
  },
})
export default class ListEmojiHeader extends Vue {
  @Prop({ required: true }) emojisByCategory!: MapEmojis;
  @Prop({}) emojiWithBorder!: boolean;
  @Prop({}) emojiSize!: number;
  @Prop({}) category!: string;
  @Prop({ required: true }) emojisByRow!: number;

  @Emit("select")
  onSelect(emoji: Emoji) {
    return emoji;
  }

  calcScrollTop() {
    return 44;
  }

  @Watch("category")
  onCategoryChanged(newValue: any) {
    const categoryEl = (this.$refs[newValue] as CategoryLabel)[0].$el;
    const refList = this.$refs["list-header"] as HTMLElement;

    refList.scrollTop = categoryEl.offsetTop - this.calcScrollTop();
  }
}
</script>

<style scoped>
.container-emoji {
  overflow-x: hidden;
  overflow-y: scroll;
}
</style>
