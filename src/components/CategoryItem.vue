<script lang="ts" functional>
import { Prop, Vue } from "vue-property-decorator";
import { Options } from 'vue-class-component';
import { VNode } from '@vue/runtime-core';
import { h as createElement } from 'vue';
@Options({})
export default class CategoryItem extends Vue {
  @Prop({ required: true }) label!: string;
  @Prop({ required: true }) icon!: string;
  render():VNode {
    return createElement('span', { class:'svg', title: this.label, innerHTML: this.icon });
  }
}
</script>

<style scoped lang="scss">
.svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
