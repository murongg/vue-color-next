<script setup lang="ts">
import type { ModelValue } from '../../../src/types'
const colors = ref<ModelValue>('#ff0000')
// watch(colors, () => {
//   console.log(colors)})
</script>

<template>
  <div>
    {{ colors }}
    <sketch v-model="colors" />
    <chrome v-model="colors" />
  </div>
</template>
