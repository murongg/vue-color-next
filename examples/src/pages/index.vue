<script setup lang="ts">
import type { ModelValue } from '../../../src/types'
const colors = ref<ModelValue>('#194d33e6')
</script>

<template>
  <div>
    {{ colors }}
    <sketch v-model="colors" />
  </div>
</template>
