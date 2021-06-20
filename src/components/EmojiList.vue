<template>
  <div id="Emojis">
    <ListEmojiHeader
      v-if="continuousList"
      v-bind="{
        emojisByCategory,
        emojiSize,
        emojiWithBorder,
        category,
        emojisByRow,
      }"
      @onSelect="onSelect"
    />
    <ListEmojiGrid
      v-else
      v-bind="{ emojis, emojiSize, emojiWithBorder, emojisByRow }"
      @onSelect="onSelect"
    />
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Emoji } from "@/models/Emoji";
import { MapEmojis } from "@/models/MapEmojis";

import EmojiItem from "./EmojiItem.vue";
import CategoryLabel from "./CategoryLabel.vue";
import ListEmojiGrid from "./ListEmojiGrid.vue";
import ListEmojiHeader from "./ListEmojiHeader.vue";

@Component({
  components: {
    EmojiItem,
    CategoryLabel,
    ListEmojiGrid,
    ListEmojiHeader,
  },
})
export default class EmojiList extends Vue {
  @Prop({ required: true }) data!: MapEmojis;
  @Prop({ required: true }) emojisByRow!: number;
  @Prop({}) emojiWithBorder!: boolean;
  @Prop({}) emojiSize!: number;
  @Prop({}) filter!: string;
  @Prop({}) continuousList!: boolean;
  @Prop({}) category!: string;
  @Prop({}) hasSearch!: boolean;

  searchByAlias(term: string, emoji: Emoji) {
    const isRelevant = (alias: string) => alias.toLowerCase().includes(term);

    return emoji.aliases.some((alias: string) => isRelevant(alias));
  }

  get emojis() {
    let emojis: Emoji[] = [];

    if (this.data[this.category]) {
      // Copy data
      emojis = [...this.data[this.category]];

      const searchValue = this.filter.trim().toLowerCase();

      if (searchValue) {
        emojis = emojis.filter((it) => this.searchByAlias(searchValue, it));
      }
    }

    return emojis;
  }

  get emojisByCategory() {
    // Copy data
    let emojisByCategory: MapEmojis = { ...this.data };

    const searchValue = this.filter.trim().toLowerCase();

    if (searchValue) {
      this.categories.forEach((category: string) => {
        emojisByCategory[category] = this.data[category].filter((it) =>
          this.searchByAlias(searchValue, it)
        );
      });
    }

    return emojisByCategory;
  }

  get categories(): any {
    return Object.keys(this.data);
  }

  get containerEmoji(): any {
    return this.$refs["container-emoji"];
  }

  @Emit("select")
  onSelect(emoji: Emoji) {
    return emoji;
  }

  @Watch("data")
  onDataChanged() {
    this.containerEmoji.scrollTop = 0;
  }
}
</script>

<style lang="scss" scoped>
#Emojis {
  font-family: Twemoji, NotomojiColor, Notomoji, EmojiOne Color, Symbola, Noto,
    Segoe UI Emoji, OpenSansEmoji, monospace;
  display: block;
  width: 100%;
  max-width: 100%;
  color: var(--ep-color-text);

  // Custom Scroll
  ::-webkit-scrollbar {
    border-radius: 4px;
    width: 4px;
    overflow: hidden;
  }
}
</style>
