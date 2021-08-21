<template>
  <div>
    <div style="width:max-content;max-width:100%">
      <textarea name="" id="" :value="message"/>
      <VEmojiPicker :customEmojis="emojis" :continuousList="true" v-if="visible"
        :limitFrequently="3" :emojisByRow="6" @select="onEmojiSelected" width="100%" :layout="layout"/>
    </div>
    <button @click="changeEmojis">Change</button>
    <button @click="changeVisibleEmojis">Toogle View</button>
    <button @click="changeLayout">switch layout</button>
  </div>
</template>

<script lang='ts'>
import { VEmojiPicker, emojisDefault } from "./index";
import { defineComponent, ref, reactive } from 'vue';
import { IEmoji } from "./models/Emoji";

export default defineComponent({
  name: "AppTestUI",
  components: {
    VEmojiPicker
  },
  setup() {
    console.log(emojisDefault.length);
    let visible = ref(true);
    let emojis = reactive(emojisDefault);
    function changeEmojis() {
      emojis.splice(0, 8);
    }
    function changeVisibleEmojis() {
      visible.value = !visible.value;
    }

    let message = ref('');
    function onEmojiSelected(emoji:IEmoji) {
      message.value += emoji.data;
    }

    let layout = ref('flex');
    function changeLayout() {
      if(layout.value == 'flex') {
        layout.value = 'grid';
      } else {
        layout.value = 'flex';
      }
    }

    return {
      visible, emojis, message, layout,
      changeEmojis, changeVisibleEmojis, onEmojiSelected, changeLayout
    };

  }
});
</script>

<style lang='scss' scoped>
  textarea {
    display: block;
    margin-bottom: 12px;
    width: 100%;
    box-sizing: border-box;
    font-size: 20px;
  }
</style>
