<template>
  <div id="Emojis" ref="Emojis">
    <div class="container-emoji">
      <div class="grid-emojis" :style="gridDynamic">
        <span
          v-for="(emoji, index) in dataFiltered"
          :key="index"
          class="emoji"
          @click="onSelect(emoji)"
          v-html="emoji['emoji']"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Emojis",
  props: {
    data: { type: Array, required: true },
    emojisByRow: { type: Number, required: true },
    filter: { type: String }
  },
  methods: {
    onSelect(emoji) {
      this.$emit("select", emoji);
    }
  },
  computed: {
    gridDynamic() {
      const percent = 100/this.emojisByRow;
      return {
        gridTemplateColumns: `repeat(${this.emojisByRow}, ${percent}%)`
      }
    },
    dataFiltered() {
      let data = this.data;
      const searchValue = this.filter.trim()

      if (searchValue) {
        data = data.filter(item => {
          return item.aliases.some(alias =>
            alias.includes(searchValue.toLowerCase())
          );
        });
      }

      return data;
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
  align-items: start;
}

.emoji {
  display: inline-block;
  text-align: center;
  font-size: 25px;
  padding: 5px;
  max-height: 30px;
  cursor: pointer;
}
</style>
