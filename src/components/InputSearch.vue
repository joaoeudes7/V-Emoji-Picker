<template>
  <div id="InputSearch">
    <div class="container-search">
      <input type="text" v-model="inputSearch" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { t } from "@/locale";

const timemout = 500;
let listenInput: number;

@Component({})
export default class InputSearch extends Vue {
  inputSearch = "";

  @Watch("inputSearch")
  onInputChanged(newValue: any, old: any) {
    clearTimeout(listenInput);

    listenInput = setTimeout(() => this.$emit("update", newValue), timemout);
  }

  get placeholder() {
    return t("search");
  }
}
</script>

<style lang="scss" scoped>
#InputSearch {
  display: block;
  width: 100%;
  max-width: 100%;
}

.container-search {
  display: block;
  justify-content: center;
  box-sizing: border-box;
  width: 100%;
  margin: 5px 0;
  padding: 0 5%;

  input {
    width: 100%;
    font-size: 14px;
    padding: 6px 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background: var(--ep-color-sbg);
    color: var(--ep-color-text);
    border: 1px solid var(--ep-color-border);
  }
}
</style>
