<template>
  <div id="InputSearch">
    <div class="container-search">
      <input type="text" v-model="inputSearch" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Vue, Watch } from "vue-property-decorator";
import { Options } from 'vue-class-component';
import { t } from "@/locale";

const timemout = 500;
let listenInput: number;

@Options({})
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
  box-sizing: border-box;
  width: 100%;
  height: 2.5em;
  line-height: 2.5em;
  padding: 0 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    width: 100%;
    font-size: 1em;
    height: 1.875em;
    line-height: 1.875em;
    padding: 0 0.5em;
    box-sizing: border-box;
    border-radius: 0.5em;
    background: var(--ep-color-sbg);
    color: var(--ep-color-text);
    border: 1px solid var(--ep-color-border);
  }
}
</style>
