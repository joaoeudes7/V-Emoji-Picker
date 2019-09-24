<template>
  <div id="EmojiPicker">
    <Categories v-if="showCategory" @select="changeCategory" />
    <InputSearch v-if="showSearch" @update="onSearch" :placeholder="labelSearch" />
    <EmojiList
      :data="mapEmojis"
      :category="category"
      :filter="filterEmoji"
      :emojisByRow="emojisByRow"
      :continuousList="continuousList"
      :hasSearch="showSearch"
      @select="onSelectEmoji"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Emoji } from "@/models/Emoji";
import { Category } from "@/models/Category";

import Categories from "./Categories.vue";
import EmojiList from "./EmojiList.vue";
import InputSearch from "./InputSearch.vue";

@Component({
  components: {
    Categories,
    EmojiList,
    InputSearch
  }
})
export default class VEmojiPicker extends Vue {
  @Prop({ required: true }) readonly pack!: Emoji[];
  @Prop({ default: "Pesquisar..." }) readonly labelSearch!: string;
  @Prop({ default: 5 }) readonly emojisByRow!: number;
  @Prop({ default: true }) readonly showCategory!: boolean;
  @Prop({ default: true }) readonly showSearch!: boolean;
  @Prop({ default: false }) readonly continuousList!: boolean;

  mapEmojis: any = {};
  category = "Peoples";
  filterEmoji = "";

  private created() {
    this.mapperData(this.pack);
  }

  async onSearch(term: string) {
    this.filterEmoji = term;
  }

  async changeCategory(category: Category) {
    const hasEmojis = this.mapEmojis[category.name].length;

    if (hasEmojis) {
      this.category = category.name;
      this.$emit("changeCategory", this.category);
    }
  }

  async onSelectEmoji(emoji: Emoji) {
    this.updateFrequently(emoji);
    this.$emit("select", emoji);
  }

  async updateFrequently(emoji: Emoji) {
    this.mapEmojis["Frequently"] = [
      ...new Set([emoji, ...this.mapEmojis["Frequently"]])
    ];
  }
  async mapperData(dataEmojis: Emoji[]) {
    this.$set(this.mapEmojis, "Frequently", []);
    dataEmojis.forEach((emoji: Emoji) => {
      const _category = emoji.category;

      if (!this.mapEmojis[_category]) {
        this.$set(this.mapEmojis, _category, [emoji]);
      } else {
        this.mapEmojis[_category].push(emoji);
      }
    });
  }
}
</script>

<style lang="scss">
#EmojiPicker {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  overflow: hidden;
  width: 325px;
  user-select: none;
}
</style>
