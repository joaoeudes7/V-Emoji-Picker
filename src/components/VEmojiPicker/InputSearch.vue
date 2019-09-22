<template>
  <div id="InputSearch">
    <div class="container-search">
      <input type="text" v-model="inputSearch" :placeholder="placeholder" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";

const timemout = 500;
let listenInput: number;

@Component({})
export default class InputSearch extends Vue {
  @Prop({ required: true }) readonly placeholder!: string;

  inputSearch = "";

  @Watch("inputSearch")
  onInputChanged(newValue: any, old: any) {
    clearTimeout(listenInput);

    listenInput = setTimeout(() => this.$emit("update", newValue), timemout);
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
    padding: 8px;
    box-sizing: border-box;
    border-radius: 8px;
    background: #f6f6f6;
    color: #4a4a4a;
    border: 1px solid #e2e2e2;
  }
}
</style>
