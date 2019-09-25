
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

<style lang="scss" scoped>
.emoji {
  display: inline-block;
  text-align: center;
  font-size: 25px;
  padding: 5px;
  height: 30px;
  width: 30px;
  cursor: pointer;

  &:hover {
    background: #00000017;
    border-radius: 8px;
  }
}
</style>
