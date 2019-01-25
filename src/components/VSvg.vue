<template>
  <img id="VSvg" :src="pathSvg" :style="styleSVG">
</template>

<script>
const cache = {};

export default {
  name: "VSvg",
  props: {
    name: { type: String, required: true },
    styles: { type: Object }
  },
  computed: {
    pathSvg() {
      if (!cache[this.name]) {
        let file = this.name;
        if (!file.includes(".svg")) {
          file += ".svg";
        }
        cache[this.name] = require(`@/assets/icons/${file}`);
      }
      return cache[this.name];
    },
    styleSVG() {
      return {
        ...this.styles
      };
    }
  }
};
</script>

<style scoped lang="scss">
#VSvg {
  display: inline-block;
  vertical-align: middle;
}
</style>
