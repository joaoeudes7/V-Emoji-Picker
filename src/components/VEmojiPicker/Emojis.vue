<template>
  <div id="Emojis" ref="Emojis">
    <div class="container-search">
      <input type="text" :value="searchValue" @keyup="setValue($event)" placeholder="Pesquisar...">
    </div>
    <div class="container-emoji">
      <div class="grid-emojis">
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
    emojiByRow: { type: Number, default: 6 }
  },
  data: () => ({
    searchValue: ""
  }),
  methods: {
    onSelect(emoji) {
      this.$emit("select", emoji);
    },
    setValue(event) {
      console.log(event)
      this.searchValue = event.target.value;
    }
  },
  computed: {
    dataFiltered() {
      let data = this.data;

      if (this.searchValue.trim()) {
        data = data.filter(item => {
          return item.aliases.some(alias =>
            alias.includes(this.searchValue.toLowerCase())
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

.container-search {
  display: block;
  justify-content: center;
  margin: 5px 0;
  padding: 0 5%;

  input {
    width: 100%;
    font-size: 14px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #f6f6f6;
    border: 1px solid #e2e2e2;
  }
}

.container-emoji {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 350px;
}

.grid-emojis {
  display: grid;
  margin: 10px 0;
  grid-template-columns: repeat(5, 20%);
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
