<template>
  <div id="InputSearch">
    <div class="container-search">
      <input
        type="text"
        :value="value"
        @keyup="onKeyUp($event)"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "InputSearch",
  props: {
    value: { type: String, required: true },
    placeholder: { type: String, required: true }
  },
  methods: {
    // Emit value of v-model
    onKeyUp(event) {
      this.$emit("input", event.target.value);
    }
  }
};
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
