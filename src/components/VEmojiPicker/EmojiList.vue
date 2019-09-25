<template>
  <div id="Emojis">
    <div ref="container-emoji" class="container-emoji">
      <template v-if="continuousList">
        <div v-for="(category, category_name) in dataFilteredByCategory" :key="category_name">
          <CategoryTitle v-show="category.length" :name="category_name" :ref="category_name" />
          <div v-if="category.length" class="grid-emojis" :style="gridDynamic">
            <EmojiItem
              v-for="(emoji, index_e) in category"
              :key="`${category_name}-${index_e}`"
              :data="emoji['emoji']"
              @click.native="onSelect(emoji)"
            />
          </div>
        </div>
      </template>
      <div v-else class="grid-emojis" :style="gridDynamic">
        <EmojiItem
          v-for="(emoji, index) in dataFiltered"
          :key="index"
          :data="emoji['emoji']"
          @click.native="onSelect(emoji)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { Emoji } from "@/models/Emoji";

import EmojiItem from "./EmojiItem.vue";
import CategoryTitle from "./CategoryTitle.vue";

@Component({
  components: {
    EmojiItem,
    CategoryTitle
  }
})
export default class EmojiList extends Vue {
  @Prop({ required: true }) readonly data!: any;
  @Prop({ required: true }) readonly emojisByRow!: number;
  @Prop({}) readonly filter!: string;
  @Prop({}) readonly continuousList!: boolean;
  @Prop({}) readonly category!: string;
  @Prop({}) readonly hasSearch!: boolean;

  async onSelect(emoji: Emoji) {
    this.$emit("select", emoji);
  }

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

  @Watch("data")
  onDataChanged(newValue: any, old: any) {
    this.containerEmoji.scrollTop = 0;
  }

  @Watch("category")
  onCategoryChanged(newValue: any, old: any) {
    if (this.continuousList) {
      const categoryEl = (this.$refs[newValue] as any)[0].$el;
      const scrollTop = categoryEl.offsetTop - this.calcScrollTop();

      this.containerEmoji.scrollTop = scrollTop;
    }
  }
}
</script>

<style lang="scss" scoped>
#Emojis {
  font-family: Twemoji, NotomojiColor, Notomoji, Symbola, Noto, Segoe UI Emoji,
    OpenSansEmoji, monospace;
  display: block;
  width: 100%;
  max-width: 100%;

  // Custom Scroll
  ::-webkit-scrollbar {
    border-radius: 4px;
    width: 4px;
    background: #7c7c7c5b;
  }

  ::-webkit-scrollbar-track {
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: #00000038;

    &:hover {
      background: #00000062;
    }
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
