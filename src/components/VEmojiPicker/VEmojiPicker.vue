<template>
  <div id="EmojiPicker">
    <Categories v-if="showCategory" @select="onChangeCategory($event)" />
    <InputSearch v-model="filterEmoji" :placeholder="labelSearch" />
    <Emojis
      :data="emojis"
      :filter="filterEmoji"
      :emojisByRow="emojisByRow"
      @select="onSelectEmoji($event)"
    />
  </div>
</template>

<script>
import Categories from './Categories';
import Emojis from './Emojis';
import InputSearch from './InputSearch';

export default {
  name: "VEmojiPicker",
  props: {
    pack: { type: Array, required: true },
    labelSearch: { type: String, default: 'Pesquisar...' },
    showCategory: { type: Boolean, default: true },
    emojisByRow: { type: Number, default: 5}
  },
  components: {
    Categories,
    Emojis,
    InputSearch
  },
  data: () => ({
    mapEmojis: {},
    category: "Peoples",
    filterEmoji: '',
  }),
  created() {
    this.mapperData(this.pack);
  },
  methods: {
    onChangeCategory(category) {
      this.category = category.name;
      this.$emit('changeCategory', this.category)
    },
    onSelectEmoji(emoji) {
      this.updateFrequenty(emoji);
      this.$emit('select', emoji);
    },
    updateFrequenty(emoji) {
      if (!this.mapEmojis['Frequenty']) {
        this.mapEmojis['Frequenty'] = [emoji]
      } else {
        this.mapEmojis['Frequenty'] = [...new Set([...this.mapEmojis['Frequenty'], emoji])]
      }
    },
    mapperData(dataEmojis) {
      dataEmojis.forEach(emoji => {
        const _category = emoji["category"];

        if (!this.mapEmojis[_category]) {
          this.mapEmojis[_category] = [emoji];
        } else {
          this.mapEmojis[_category].push(emoji);
        }
      });
    }
  },
  beforeDestroy() {
    delete this.mapEmojis
  },
  computed: {
    emojis() {
      const emojis = this.mapEmojis[this.category];
      return emojis || [];
    }
  }
};
</script>

<style lang="scss" scoped>
#EmojiPicker {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  background: #F0F0F0;
  border-radius: 4px;
  border: 1px solid #e4e4e4;
  overflow: hidden;
  width: 325px;
  user-select: none;
}
</style>
