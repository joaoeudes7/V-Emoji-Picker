<template>
  <span class="svg" :style="styleSVG" :title="name" v-html="icon" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class CategoryItem extends Vue {
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) icon!: string;
  @Prop({}) styles!: object;

  get styleSVG() {
    return {
      ...this.styles
    };
  }
}
</script>

<style scoped lang="scss">
.svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
