<template>
  <div id="SkinSelect">
    <div class="label-skin">Select Skin</div>
    <div class="list-skin">
      <SkinItem
        v-for="(skin, i) in skins"
        v-bind="{ skin, active: skin.character == value }"
        :key="i"
        @click="setSkin(skin)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Skin } from "../models/Skin";

import SkinItem from "./SkinItem.vue";

@Component({
  components: {
    SkinItem
  }
})
export default class SkinSelect extends Vue {
  @Prop({ default: "🏻" }) value!: string;
  @Prop({ default: "🏻" }) skins!: Skin[];

  @Emit("input")
  setSkin(skin: Skin) {
    console.log(skin);
    return skin;
  }
}
</script>

<style lang="scss" scoped>
#SkinSelect {
  display: flex;
  width: 100%;
  height: 48px;
  background: #e2e2e2;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.label-skin {
  margin-left: 10px;
}

.list-skin {
  display: flex;
  margin-right: 10px;
  justify-content: center;
  border-radius: 20px;
  border: 1px solid #666;
}
</style>
