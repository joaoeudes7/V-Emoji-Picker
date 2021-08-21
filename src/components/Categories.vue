<script lang="ts">
import { h as createElement } from 'vue';
import { RendererElement, RendererNode, VNode } from "@vue/runtime-core";
import { Prop, Vue, Emit } from "vue-property-decorator";
import { Options } from 'vue-class-component';
import { Category } from "@/models/Category";

import CategoryItem from "./CategoryItem.vue";

@Options({
  components: {
    CategoryItem
  }
})
export default class Categories extends Vue {
  @Prop({}) categories!: Category[];
  @Prop({}) current!: string;

  @Emit("select")
  onSelect(category: Category) {
    return category;
  }

  render():VNode {
    return createElement('div', { id: 'Categories' }, this.categories.map((category, index) => (
      createElement('div', { title: category.label, key: index, class:['category', { active: category.name === this.current }],
       onClick: () => this.onSelect(category), innerHTML:category.icon })
    )));
  }
}
</script>

<style lang="scss" scoped>
#Categories {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid var(--ep-color-border);
  background: var(--ep-color-bg);
  overflow-x: auto;
}

.category {
  flex: 1;
  height: 32px;
  line-height: 32px;
  text-align: center;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--ep-color-active);
    filter: saturate(3);
    width: 100%;

  }

  & > img {
    width: 22px;
    height: 22px;
  }

  &:not(.active):hover {
    filter: brightness(1.2);
  }
}
</style>
