# V-Emoji-Picker
This simple package use Emojis Natives

[![npm](https://img.shields.io/npm/v/v-emoji-picker.svg)
![bundlephobia](https://img.shields.io/bundlephobia/minzip/v-emoji-picker.svg?style=flat)
![npm](https://img.shields.io/npm/dm/v-emoji-picker.svg)](https://www.npmjs.com/package/v-emoji-picker)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

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
    <VEmojiPicker :pack="pack" @select="selectEmoji" />
  </div>
</template>

<script>
import VEmojiPicker from 'v-emoji-picker';
import packData from 'v-emoji-picker/data/emojis.json';

export default {
  name: 'Demo',
  components: {
    VEmojiPicker
  },
  data: () => ({
    pack: packData
  }),
  methods: {
    selectEmoji(emoji) {
      console.log(emoji)
    }
  }
}
</script>

```

## Props
```js
{
  pack: { type: Array, required: true },
  labelSearch: { type: String, default: 'Pesquisar...' },
  showCategory: { type: Boolean, default: true },
  emojisByRow: { type: Number, default: 5}
}
```

## Events
```js
{
  select: 'Emit event on Selected Emoji',
  changeCategory: 'Emit event on Change Category'
}
```

# Estructure Emoji
![](.emoji.png)

# Demo
<!-- Click here to view in Browser: [Vue Component (Multi Select/Double Select)](link) -->
