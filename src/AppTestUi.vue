<template>
  <div>
    <div style="width:max-content">
      <textarea name="" id="" :value="message"/>
      <VEmojiPicker :customEmojis="emojis" :continuousList="true" v-if="visible"
        :limitFrequently="3" :emojisByRow="6" @select="onEmojiSelected" />
    </div>
    <button @click="changeEmojis">Change</button>
    <button @click="changeVisibleEmojis">Toogle View</button>
    <div content="😁"></div>
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

    return {
      visible, emojis, message,
      changeEmojis, changeVisibleEmojis, onEmojiSelected
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
