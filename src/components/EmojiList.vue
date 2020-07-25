<template>
  <div id="Emojis">
    <div ref="container-emoji" class="container-emoji">
      <template v-if="continuousList">
        <div v-for="(category, category_name) in dataFilteredByCategory" :key="category_name">
          <CategoryLabel v-show="category.length" :name="category_name" :ref="category_name" />
          <div v-if="category.length" class="grid-emojis" :style="gridDynamic">
            <EmojiItem
              v-for="(emoji, index_e) in category"
              :key="`${category_name}-${index_e}`"
              :emoji="emoji"
              :size="emojiSize"
              :withBorder="emojiWithBorder"
              @click.native="onSelect(emoji)"
            />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="grid-emojis" :style="gridDynamic">
          <EmojiItem
            v-for="(emoji, index) in dataFiltered"
            :key="index"
            :emoji="emoji"
            :size="emojiSize"
            :withBorder="emojiWithBorder"
            @click.native="onSelect(emoji)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";
import { Emoji } from "@/models/Emoji";

import EmojiItem from "./EmojiItem.vue";
import CategoryLabel from "./CategoryLabel.vue";

@Component({
  components: {
    EmojiItem,
    CategoryLabel
  }
})
export default class EmojiList extends Vue {
  @Prop({ required: true }) data!: any;
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

  calcScrollTop() {
    return this.hasSearch ? 88 : 44;
  }

  get gridDynamic() {
    const percent = 100 / this.emojisByRow;
    return {
      gridTemplateColumns: `repeat(${this.emojisByRow}, ${percent}%)`
    };
  }

  get dataFiltered() {
    let data = this.data[this.category];
    const searchValue = this.filter.trim().toLowerCase();

    if (searchValue) {
      data = data.filter((emoji: Emoji) =>
        this.searchByAlias(searchValue, emoji)
      );
    }

    return data;
  }

  get dataFilteredByCategory() {
    let _data = Object.assign({}, this.data);
    const searchValue = this.filter.trim().toLowerCase();

    if (searchValue) {
      this.categories.forEach((category: string) => {
        _data[category] = this.data[category].filter((item: Emoji) =>
          this.searchByAlias(searchValue, item)
        );
      });
    }

    return _data;
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

  @Watch("category")
  onCategoryChanged(newValue: any) {
    if (this.continuousList) {
      const categoryEl = (this.$refs[newValue] as any)[0].$el;

      this.containerEmoji.scrollTop =
        categoryEl.offsetTop - this.calcScrollTop();
    }
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

.container-emoji {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 350px;
}

.grid-emojis {
  display: grid;
  margin: 5px 0;
  justify-items: center;
}
</style>
