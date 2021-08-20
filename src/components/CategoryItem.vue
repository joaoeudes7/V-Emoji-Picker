<template>
  <span class="svg" :title="label" v-html="icon" />
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";
import { Options } from 'vue-class-component';
@Options({})
export default class CategoryItem extends Vue {
  @Prop({ required: true }) label!: string;
  @Prop({ required: true }) icon!: string;
}
</script>

<style scoped lang="scss">
.svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
