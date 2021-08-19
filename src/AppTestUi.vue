<template>
  <div>
    <div>
      <VEmojiPicker :customEmojis="emojis" :continuousList="true" v-if="visible" :dark="true" />
    </div>
    <button @click="changeEmojis">Change</button>
    <button @click="changeVisibleEmojis">Toogle View</button>
  </div>
</template>

<script lang='ts'>
import { Vue } from "vue-property-decorator";
import { Options } from 'vue-class-component';
import { VEmojiPicker, emojisDefault } from "./index";
import { defineComponent } from 'vue';

export default defineComponent({
  name: "AppTestUI",
  components: {
    VEmojiPicker
  },
  data() {
    return {
      visible:false,
      emojis: emojisDefault
    };
  },
  methods:{
    changeEmojis() {
       this.emojis.splice(0, 8);
       console.log(this.emojis);
    },
    changeVisibleEmojis() {
      this.visible = !this.visible;
    }
  },
});
</script>

<style lang='scss' scoped>
</style>
