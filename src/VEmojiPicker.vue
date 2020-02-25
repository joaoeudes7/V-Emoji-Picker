<template>
  <div id="EmojiPicker">
    <Categories
      v-if="showCategories"
      :categories="categoriesFilted"
      :current="currentCategory"
      @select="changeCategory"
    />
    <InputSearch v-if="showSearch" @update="onSearch" :placeholder="labelSearch" />
    <EmojiList
      :data="mapEmojis"
      :category="currentCategory"
      :filter="filterEmoji"
      :emojiWithBorder="emojiWithBorder"
      :emojiSize="emojiSize"
      :emojisByRow="emojisByRow"
      :continuousList="continuousList"
      :hasSearch="showSearch"
      @select="onSelectEmoji"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";

import { IEmoji } from "./models/Emoji";
import { ICategory } from "./models/Category";

import { emojisDefault } from "./utils/emojis";
import { categoriesDefault } from "./utils/categories";

import Categories from "./components/Categories.vue";
import EmojiList from "./components/EmojiList.vue";
import InputSearch from "./components/InputSearch.vue";

@Component({
  components: {
    Categories,
    EmojiList,
    InputSearch
  }
})
export default class VEmojiPicker extends Vue {
  @Prop({ default: () => new Array() }) customEmojis!: IEmoji[];
  @Prop({ default: () => new Array() }) customCategories!: ICategory[];
  @Prop({ default: 5 }) emojisByRow!: number;
  @Prop({ default: false }) continuousList!: boolean;
  @Prop({ default: 32 }) emojiSize!: number;
  @Prop({ default: true }) emojiWithBorder!: boolean;
  @Prop({ default: true }) showSearch!: boolean;
  @Prop({ default: true }) showCategories!: boolean;
  @Prop({ default: "Search" }) labelSearch!: string;
  @Prop({ default: "Peoples" }) initialCategory!: string;
  @Prop({ default: () => [] as string[] }) exceptCategories!: string[];

  dataEmojis: IEmoji[] = [];
  dataCategories: ICategory[] = [];

  mapEmojis: any = {};
  currentCategory = this.initialCategory;
  filterEmoji = "";

  created() {
    if (!this.customEmojis.length) {
      import("./utils/emojis").then(data => {
        this.dataEmojis = data.emojisDefault;
        this.mapperEmojisCategory(this.dataEmojis);
      });
    } else {
      this.dataEmojis = this.customEmojis;
      this.mapperEmojisCategory(this.dataEmojis);
    }

    if (!this.customCategories.length) {
      import("./utils/categories").then(data => {
        this.dataCategories = data.categoriesDefault;
      });
    } else {
      this.dataCategories = this.customCategories;
    }
  }

  async onSearch(term: string) {
    this.filterEmoji = term;
  }

  async changeCategory(category: ICategory) {
    const hasEmojis = this.mapEmojis[category.name].length;
    this.currentCategory = category.name;

    if (hasEmojis) {
      this.onChangeCategory(category);
    }
  }

  async updateFrequently(emoji: IEmoji) {
    this.mapEmojis["Frequently"] = [
      ...new Set([emoji, ...this.mapEmojis["Frequently"]])
    ];
  }

  mapperEmojisCategory(emojis: IEmoji[]) {
    this.$set(this.mapEmojis, "Frequently", []);

    emojis.forEach((emoji: IEmoji) => {
      const _category = emoji.category;

      if (!this.mapEmojis[_category]) {
        this.$set(this.mapEmojis, _category, [emoji]);
      } else {
        this.mapEmojis[_category].push(emoji);
      }
    });
  }

  get categoriesFilted() {
    return this.dataCategories.filter(
      c => !this.exceptCategories.includes(c.name)
    );
  }

  @Emit("select")
  async onSelectEmoji(emoji: IEmoji) {
    this.updateFrequently(emoji);

    return emoji;
  }

  @Emit("changeCategory")
  async onChangeCategory(category: ICategory) {
    return category;
  }

  @Watch("category")
  watchCategory(newValue: string, old: string) {
    this.currentCategory = newValue;
  }
}
</script>

<style lang="scss">
#EmojiPicker {
  display: inline-flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  overflow: hidden;
  width: 325px;
  user-select: none;

  @media screen and (max-width: 325px) {
    width: 100%;
  }
}
</style>
