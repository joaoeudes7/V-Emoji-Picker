<template>
  <div id="EmojiPicker">
    <Categories
      v-if="showCategories"
      :categories="categoriesFiltered"
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

import { IEmoji, Emoji } from "./models/Emoji";
import { ICategory, Category } from "./models/Category";
import { MapEmojis } from "./models/MapEmojis";

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
  @Prop({ default: () => [] }) customEmojis!: IEmoji[];
  @Prop({ default: () => [] }) customCategories!: ICategory[];
  @Prop({ default: 15 }) limitFrequently!: number;
  @Prop({ default: 5 }) emojisByRow!: number;
  @Prop({ default: false }) continuousList!: boolean;
  @Prop({ default: 32 }) emojiSize!: number;
  @Prop({ default: true }) emojiWithBorder!: boolean;
  @Prop({ default: true }) showSearch!: boolean;
  @Prop({ default: true }) showCategories!: boolean;
  @Prop({ default: "Peoples" }) initialCategory!: string;
  @Prop({ default: () => [] as ICategory[] }) exceptCategories!: ICategory[];
  @Prop({ default: () => [] as Emoji[] }) exceptEmojis!: IEmoji[];
  @Prop({}) lang!: string;
  @Prop({}) i18n!: Object;

  mapEmojis: MapEmojis = {};
  mapCategories: ICategory[] = [];

  currentCategory = this.initialCategory;
  filterEmoji = "";

  created() {
    // Initial params
    let emojisToUse: IEmoji[] = [];

    if (!this.customEmojis.length) {
      emojisToUse = require("./utils/emojis").emojisDefault;
    } else {
      emojisToUse = this.customEmojis;
    }

    if (!this.customCategories.length) {
      this.mapCategories = require("./utils/categories").categoriesDefault;
    } else {
      this.mapCategories = this.customCategories;
    }

    const categoriesNames = this.mapCategories.map(c => c.name);
    if (!categoriesNames.includes(this.initialCategory)) {
      this.initialCategory = categoriesNames[0];
    }

    // Create map
    this.mapperEmojisCategory(emojisToUse);
    this.restoreFrequentlyEmojis();

    // Configure i18n
    if (this.lang) {
      locale.use(this.lang);
    }

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
    return this.mapCategories.filter(
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
