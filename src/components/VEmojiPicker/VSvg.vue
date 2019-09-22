<template>
  <span class="svg" :style="styleSVG">
    <img loading="lazy" :src="icon" width="20px" :alt="name" />
  </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class VSvg extends Vue {
    @Prop({ required: true }) readonly name!: string;
    @Prop({}) readonly styles!: object;

    get icon(): string {
      return require(`@/assets/${this.name}.svg`);
    }

    get styleSVG() {
      return {
        ...this.styles
      };
    }
};
</script>

<style scoped lang="scss">
.svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
