# V-Emoji-Picker

[![npm](https://img.shields.io/npm/v/v-emoji-picker.svg)
![bundlephobia](https://img.shields.io/bundlephobia/minzip/v-emoji-picker.svg?style=flat)
![npm](https://img.shields.io/npm/dm/v-emoji-picker.svg)](https://www.npmjs.com/package/v-emoji-picker.svg)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

![](.demo.png)

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

# Estructure Emoji
![](.emoji.png)

# Demo
<!-- Click here to view in Browser: [Vue Component (Multi Select/Double Select)](link) -->
