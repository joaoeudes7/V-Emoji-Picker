<template>
  <div id="Emojis" ref="Emojis">
    <div v-for="(row, index) in dataEmojis" class="row" :key="index">
      <span
        v-for="(emoji, _index) in row"
        :key="_index"
        class="emoji"
        @click="onSelect(emoji)"
      >{{ emoji['emoji'] }}</span>
    </div>
  </div>
</template>

<script>
import Emoji from "../models/Emoji.js";

export default {
  name: "Emojis",
  props: {
    data: { type: Array, required: true },
    emojiByRow: { type: Number, default: 8 }
  },
  data: () => ({
    typing: ""
  }),
  methods: {
    onSelect(emoji) {
      this.$emit("select", emoji);
    },
    groupBySize(array, size) {
      let group = [];

      for (let index = 0; index < array.length / size; index++) {
        const _startGroup = index * size;
        const _endGroup = (index + 1) * size;

        group[index] = array.slice(_startGroup, _endGroup);
      }

      return group;
    }
  },
  computed: {
    dataEmojis() {
      const emojis = this.groupBySize(this.data, this.emojiByRow);
      console.log(emojis);
      return emojis;
    }
  },
  watch: {
    data() {
      this.$el.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
#Emojis {
  display: block;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
}

.row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 40px;
}

.emoji {
  cursor: pointer;
  flex-basis: 12.5%;
  text-align: center;
  font-size: 25px;
  margin: 0 4.5px;
}
</style>
