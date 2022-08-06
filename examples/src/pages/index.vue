<script setup lang="ts">
import type { ModelValue } from '../../../src/types'
const colors = ref<ModelValue>('#ff0000')
</script>

<template>
  <div>
    {{ colors }}
    <sketch v-model="colors" />
  </div>
</template>
