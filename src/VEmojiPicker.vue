<template>
  <div id="EmojiPicker" :class="['emoji-picker', {dark}]">
    <Categories
      v-if="showCategories"
      :categories="categoriesFiltered"
      :current="currentCategory"
      @select="changeCategory"
    />
    <InputSearch v-if="showSearch" @update="onSearch" />
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
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

import { Emoji, IEmoji } from "./models/Emoji";
import { ICategory } from "./models/Category";
import { MapEmojis } from "./models/MapEmojis";

import { emojisDefault } from "./utils/emojis";
import { categoriesDefault } from "./utils/categories";

import Categories from "./components/Categories.vue";
import EmojiList from "./components/EmojiList.vue";
import InputSearch from "./components/InputSearch.vue";

import locale from "./locale";

@Component({
  components: {
    Categories,
    EmojiList,
    InputSearch
  }
})
export default class VEmojiPicker extends Vue {
  @Prop({ default: () => emojisDefault }) customEmojis!: IEmoji[];
  @Prop({ default: () => categoriesDefault }) customCategories!: ICategory[];
  @Prop({ default: 15 }) limitFrequently!: number;
  @Prop({ default: 5 }) emojisByRow!: number;
  @Prop({ default: false }) continuousList!: boolean;
  @Prop({ default: 32 }) emojiSize!: number;
  @Prop({ default: true }) emojiWithBorder!: boolean;
  @Prop({ default: true }) showSearch!: boolean;
  @Prop({ default: true }) showCategories!: boolean;
  @Prop({ default: false }) dark!: boolean;
  @Prop({ default: "Peoples" }) initialCategory!: string;
  @Prop({ default: () => [] as ICategory[] }) exceptCategories!: ICategory[];
  @Prop({ default: () => [] as Emoji[] }) exceptEmojis!: IEmoji[];
  @Prop({}) i18n!: Object;

  mapEmojis: MapEmojis = {};

  currentCategory = this.initialCategory;
  filterEmoji = "";

  created() {
    const categoriesNames = this.customCategories.map(c => c.name);
    if (!categoriesNames.includes(this.initialCategory)) {
      this.initialCategory = categoriesNames[0];
    }

    // Create map
    this.mapperEmojisCategory(this.customEmojis);
    this.restoreFrequentlyEmojis();

    // Configure i18n
    if (this.i18n) {
      locale.i18n(this.i18n);
    }
  }

  beforeDestroy() {
    this.mapEmojis = {};
  }

  async onSearch(term: string) {
    this.filterEmoji = term;
  }

  async changeCategory(category: ICategory) {
    const hasEmojis = this.mapEmojis[category.name].length;
    this.currentCategory = category.name;

    if (hasEmojis) {
      await this.onChangeCategory(category);
    }
  }

  async updateFrequently(emoji: IEmoji) {
    const oldEmojis = this.mapEmojis["Frequently"];
    const emojis = [...new Set([emoji, ...oldEmojis])];

    this.mapEmojis["Frequently"] = emojis.slice(0, this.limitFrequently);

    await this.saveFrequentlyEmojis(emojis);
  }

  async mapperEmojisCategory(emojis: IEmoji[]) {
    this.$set(this.mapEmojis, "Frequently", []);

    emojis
      .filter(emoji => !this.exceptEmojis.includes(emoji))
      .forEach(emoji => {
        const _category = emoji.category;

        if (!this.mapEmojis[_category]) {
          this.$set(this.mapEmojis, _category, []);
        }

        this.mapEmojis[_category].push(emoji);
      });
  }

  async restoreFrequentlyEmojis() {
    const jsonMapIndexEmojis = localStorage.getItem("frequentlyEmojis");

    const mapIndexEmojis = JSON.parse(jsonMapIndexEmojis!!) || [];
    this.mapEmojis["Frequently"] = mapIndexEmojis.map(
      index => this.customEmojis[index]
    );
  }

  async saveFrequentlyEmojis(emojis: IEmoji[]) {
    const mapIndexEmojis = emojis.map(emoji => {
      return this.customEmojis.indexOf(emoji);
    });

    localStorage.setItem("frequentlyEmojis", JSON.stringify(mapIndexEmojis));
  }

  get categoriesFiltered() {
    return this.customCategories.filter(
      category => !this.exceptCategories.includes(category)
    );
  }

  @Emit("select")
  async onSelectEmoji(emoji: IEmoji) {
    await this.updateFrequently(emoji);

    return emoji;
  }

  @Emit("changeCategory")
  async onChangeCategory(category: ICategory) {
    return category;
  }

  @Watch("customEmojis")
  onChangeCustomEmojis(newEmojis: IEmoji[]) {
    if (newEmojis && newEmojis.length) {
      this.mapEmojis = {};
      this.mapperEmojisCategory(newEmojis);
    }
  }
}
</script>

<style lang="scss" scoped>
.emoji-picker {
  --ep-color-bg: #f0f0f0;
  --ep-color-sbg: #f6f6f6;
  --ep-color-border: #e4e4e4;
  --ep-color-text: #4a4a4a;
  --ep-color-active: #009688;

  display: inline-flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  flex-direction: column;
  align-items: center;
  background-color: var(--ep-color-bg);
  border-radius: 4px;
  border: 1px solid var(--ep-color-border);
  overflow: hidden;
  width: 325px;
  user-select: none;

  @media screen and (max-width: 325px) {
    width: 100%;
  }
}

.dark {
  --ep-color-bg: #191B1A;
  --ep-color-sbg: #212221;
  --ep-color-border: #3E3D42;
  --ep-color-text: #f0f0f0;
  --ep-color-active: #009688;
}
</style>
