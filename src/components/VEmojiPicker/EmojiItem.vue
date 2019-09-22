
<template>
  <span class="emoji" v-html="data" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class EmojiItem extends Vue {
  @Prop({}) readonly data!: string;
};
</script>

<style lang="scss" scoped></style>
