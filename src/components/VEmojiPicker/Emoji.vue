<template>
  <span class="emoji" v-html="data" />
</template>

<script>
export default {
  name: "Emoji",
  props: {
    data: { type: String }
  }
};
</script>

<style lang="scss" scoped></style>
