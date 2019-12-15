# V-Emoji-Picker
This simple package using Emojis Natives

[![npm](https://img.shields.io/npm/v/v-emoji-picker.svg)](https://www.npmjs.com/package/v-emoji-picker)
[![bundlephobia](https://img.shields.io/bundlephobia/minzip/v-emoji-picker.svg?style=flat)](https://bundlephobia.com/result?p=v-emoji-picker@latest)
[![npm](https://img.shields.io/npm/dm/v-emoji-picker.svg)](https://www.npmjs.com/package/v-emoji-picker)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjoaoeudes7%2FV-Emoji-Picker.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjoaoeudes7%2FV-Emoji-Picker?ref=badge_shield)

![example: Android](.demo.png)

## Table of contents
- [Installation](#installation)
- [Usage](#usage)
- [Demo](#demo)

# Installation
```bash
yarn add v-emoji-picker
```
# Usage
```vue
<template>
  <div id="app">
    <VEmojiPicker :pack="emojisNatives" @select="selectEmoji" />
  </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';
import packEmoji from "v-emoji-picker/data/emojis.js";

export default {
  name: 'Demo',
  components: {
    VEmojiPicker
  },
  data: () => ({
    emojisNatives: packEmoji
  }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>
```

or Global

```js
import Vue from "vue";
import App from "./App.vue";
import { VEmojiPicker } from 'v-emoji-picker';

Vue.config.productionTip = false;
Vue.use(VEmojiPicker);

new Vue({
  render: h => h(App)
}).$mount("#app");
```

## Props
```js
{
  pack: { type: Array, required: true },
  labelSearch: { type: String, default: 'Pesquisar...' },
  showCategory: { type: Boolean, default: true },
  emojisByRow: { type: Number, default: 5 },
  showSearch: { type: Boolean, default: () => true },
  continuousList: { type: Boolean, default: false }
}
```

## Events
```js
{
  select: 'Emit event on Selected Emoji',
  changeCategory: 'Emit event on Change Category'
}
```

# Structure Emoji
![](.emoji.png)
## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjoaoeudes7%2FV-Emoji-Picker.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjoaoeudes7%2FV-Emoji-Picker?ref=badge_large)
