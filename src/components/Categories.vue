<template>
  <div id="Categories">
    <div
      :class="[{ 'active': index === active }, 'category']"
      v-for="(categorie, index) in categories"
      :key="index"
      @click="onSelect(index)" >
      <VSvg :name="categorie.icon"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Categories",
  components: {
    VSvg: () => import("./VSvg.vue")
  },
  data: () => ({
    categories: [
      { name: "Frequenty", icon: "frequenty" },
      { name: "Peoples", icon: "peoples" },
      { name: "Nature", icon: "nature" },
      { name: "Foods", icon: "foods" },
      { name: "Activity", icon: "activity" },
      { name: "Objects", icon: "objects" },
      { name: "Places", icon: "places" },
      { name: "Symbols", icon: "symbols" },
      { name: "Flags", icon: "flags" }
    ],
    active: 1
  }),
  methods: {
    onSelect(index) {
      this.active = index;

      const _category = this.categories[index];
      this.$emit("select", _category);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

#Categories {
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  background: $secundary;
  color: white;
  border-bottom: 1px solid #e4e4e4;
}

.category {
  padding: 5px 10px;
  cursor: pointer;

  & > img {
    width: 22px;
    height: 22px;
  }
}

.active {
  border-bottom: 3px solid $primary;
  filter: saturate(3);
}
</style>

