<template>
  <div id="EmojiPicker">
    <Categories v-if="showCategory" @select="onChangeCategory($event)" />
    <InputSearch
      v-if="showSearch"
      v-model="filterEmoji"
      :placeholder="labelSearch"
    />
    <EmojiList
      :data="emojis"
      :category="category"
      :filter="filterEmoji"
      :emojisByRow="emojisByRow"
      :continuousList="continuousList"
      @select="onSelectEmoji($event)"
    />
  </div>
</template>

<script>
import Categories from "./Categories";
import EmojiList from "./EmojiList";
import InputSearch from "./InputSearch";

export default {
  name: "VEmojiPicker",
  props: {
    pack: { type: Array, required: true },
    labelSearch: { type: String, default: "Pesquisar..." },
    showCategory: { type: Boolean, default: true },
    emojisByRow: { type: Number, default: 5 },
    showSearch: { type: Boolean, default: () => true },
    continuousList: { type: Boolean, default: () => false }
  },
  components: {
    Categories,
    EmojiList,
    InputSearch
  },
  data: () => ({
    mapEmojis: {},
    category: "Peoples",
    filterEmoji: ""
  }),
  created() {
    this.mapperData(this.pack);
  },
  methods: {
    onChangeCategory(category) {
      this.category = category.name;
      this.$emit("changeCategory", this.category);
    },
    onSelectEmoji(emoji) {
      this.updateFrequenty(emoji);
      this.$emit("select", emoji);
    },
    updateFrequenty(emoji) {
      this.mapEmojis["Frequenty"] = [
        ...new Set([...this.mapEmojis["Frequenty"], emoji])
      ];
    },
    mapperData(dataEmojis) {
      this.$set(this.mapEmojis, "Frequenty", []);

      dataEmojis.forEach(emoji => {
        const _category = emoji["category"];

        if (!this.mapEmojis[_category]) {
          this.$set(this.mapEmojis, _category, [emoji]);
        } else {
          this.mapEmojis[_category].push(emoji);
        }
      });
    }
  },
  beforeDestroy() {
    delete this.mapEmojis;
  },
  computed: {
    emojis() {
      return this.mapEmojis;
    }
  }
};
</script>

<style lang="scss" scoped>
#EmojiPicker {
  display: inline-flex;
  flex-direction: column;
  font-family: "DejaVu Sans", sans-serif;
  align-items: center;
  background: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  overflow: hidden;
  width: 325px;
  user-select: none;
}
</style>
