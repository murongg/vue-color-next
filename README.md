# vue-color-next

<div style="display:flex;width:100%;justify-content:center;">
<img src="https://img.shields.io/npm/v/vue-color-next?color=a1b858&label=version"/>
<img src="https://img.shields.io/npm/dw/vue-color-next" />
</div>
<br />
<div style="display:flex;width:100%;justify-content:center;">
<img src="https://img.shields.io/bundlephobia/min/vue-color-next" />
<img src="https://img.shields.io/github/repo-size/murongg/vue-color-next" />
<img src="https://img.shields.io/npm/l/vue-color-next" />
<img src="https://img.shields.io/github/issues/murongg/vue-color-next" />
<img src="https://img.shields.io/github/issues-pr/murongg/vue-color-next" />
</div>

<br />
Vue Color Picker Component for Vue 3.x
<br />

## 📎 Installation
```sh
$ npm i vue-color-next
# or
$ yarn add vue-color-next
```

## 🌎 CDN

CDN:  https://unpkg.com/vue-color-next
```html
<link rel="stylesheet" href="https://unpkg.com/vue-color-next/index.min.css">
<script src="https://unpkg.com/vue-color-next"></script>
<script>
  Vue.createApp(App).use(VueColor.VueColor)
  ...
</script>
```

## 👽 Usage

main.js:

```js
import { createApp } from 'vue'
import { VueColor } from 'vue-color-next'
import App from './App.vue'
import 'vue-color-next/index.css'

const app = createApp(App)
app.use(VueColor)
app.mount('#app')
```
App.vue:
```vue
<script setup>
const colors = ref('#ff0000')
</script>

<template>
  <sketch v-model="colors" />
</template>
```
## 🌸 Inspires

- [xiaokaike/vue-color](https://github.com/xiaokaike/vue-color)
