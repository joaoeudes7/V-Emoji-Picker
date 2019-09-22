<template>
  <div id="Categories">
    <div
      v-for="(categorie, index) in categories"
      :class="['category', { active: index === active }]"
      :key="index"
      @click="onSelect(index)"
    >
      <VSvg :name="categorie.icon" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Category } from '@/models/Category';

import VSvg from "./VSvg.vue";

@Component({
  components: {
    VSvg
  }
})
export default class Categories extends Vue{
  active = 1;
  categories: Category[] = [
      { name: "Frequenty", icon: "frequenty" },
      { name: "Peoples", icon: "peoples" },
      { name: "Nature", icon: "nature" },
      { name: "Foods", icon: "foods" },
      { name: "Activity", icon: "activity" },
      { name: "Objects", icon: "objects" },
      { name: "Places", icon: "places" },
      { name: "Symbols", icon: "symbols" },
      { name: "Flags", icon: "flags" }
  ];

  onSelect(index: number) {
    this.active = index;

    this.$emit("select", this.categories[index]);
  }
};
</script>

<style lang="scss" scoped>
#Categories {
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e4e4e4;
  background: #f0f0f0;
  color: white;
}

.category {
  flex: 1;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid #009688;
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
