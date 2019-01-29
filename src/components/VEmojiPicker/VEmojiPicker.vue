<template>
  <div id="EmojiPicker">
    <Categories v-if="showCategory" @select="onChangeCategory($event)" />
    <Emojis :data="emojis" @select="onSelectEmoji($event)" />
    <Helper v-if="showHelper" />
  </div>
</template>

<script>
import Categories from './Categories';
import Emojis from './Emojis';
import Helper from './Helper';

export default {
  name: "VEmojiPicker",
  props: {
    pack: { type: Array, required: true },
    showCategory: { type: Boolean, default: true },
    showHelper: { type: Boolean, default: true }
  },
  components: {
    Categories,
    Emojis,
    Helper
  },
  data: () => ({
    mapEmojis: {},
    category: "Peoples"
  }),
  created() {
    this.mapperData(this.pack);
    console.log(this.mapEmojis);
  },
  methods: {
    onChangeCategory(category) {
      this.category = category.name;
    },
    onSelectEmoji(emoji) {
      this.updateFrequenty(emoji);
      console.log(emoji);
    },
    updateFrequenty(emoji) {
      if (!this.mapEmojis['Frequenty']) {
        this.mapEmojis['Frequenty'] = []
      }
      if (!this.mapEmojis['Frequenty'].includes(emoji)) {
        this.mapEmojis['Frequenty'].push(emoji)
      }
    },
    mapperData(dataEmojis) {
      dataEmojis.forEach(emoji => {
        const _category = emoji["category"];

        if (!this.mapEmojis[_category]) {
          this.mapEmojis[_category] = [];
        }
        this.mapEmojis[_category].push(emoji);
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
  width: 350px;
  user-select: none;
}
</style>
