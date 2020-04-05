<template>
  <div class="category-title">{{ name }}</div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class CategoryLabel extends Vue {
  @Prop({ required: true }) name!: string;
}
</script>

<style lang='scss' scoped>
.category-title {
  text-transform: uppercase;
  font-size: 0.8em;
  padding: 5px 0 0 16px;
  color: #676666;

  &:not(:first-of-type) {
    padding: 10px 0 0 16px;
  }
}
</style>
