<template>
  <div id="Categories">
    <div
      v-for="(category, index) in categories"
      :class="['category', { active: category.name === current }]"
      :key="index"
      @click="onSelect(category)"
    >
      <CategoryItem :label="category.label" :icon="category.icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Category } from "@/models/Category";

import CategoryItem from "./CategoryItem.vue";

@Component({
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
  padding: 5px;
  text-align: center;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid var(--ep-color-active);
    filter: saturate(3);
    padding-bottom: 2px;
  }

  & > img {
    width: 22px;
    height: 22px;
  }

  &:hover {
    filter: saturate(3);
  }
}
</style>
