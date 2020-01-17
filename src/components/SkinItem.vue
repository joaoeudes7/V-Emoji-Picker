<template>
  <span class="skin__item" :class="{ 'skin__active': active }" :style="{ background: skin.color }" />
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
import { Skin } from "../models/Skin";

@Component({})
export default class SkinItem extends Vue {
  @Prop() skin!: Skin;
  @Prop({}) active!: boolean;
}
</script>

<style lang='scss' scoped>
.skin {
  border-radius: 100%;

  &__item {
    @extend .skin;
    display: flex;
    width: 0.7rem;
    height: 0.7rem;
    margin: 3px 3px;
    border: 1px solid #666;
    cursor: pointer;
  }

  &__active {
    @extend .skin;
    background: white;
    margin: auto;
    width: 0.3rem;
    height: 0.3rem;
  }
}
</style>
