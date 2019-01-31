<template>
  <span id="VSvg" :style="styleSVG" v-html="icon" />
</template>

<script>
import { categories } from './_Icons.js';

export default {
  name: "VSvg",
  props: {
    name: { type: String, required: true },
    styles: { type: Object }
  },
  computed: {
    icon() {
      return categories[this.name];
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
