<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { ModelValue } from '../../src/types'
const colors = ref<ModelValue>('#84ACDAFF')

const style = computed<StyleValue>(() => {
  const color = typeof colors.value === 'string' ? colors.value : colors.value.hex
  return {
    background: color,
  }
})

</script>

<template>
  <main font-sans w-screen h-screen p="x-4 y-10" text="white dark:gray-200" :style="style">
    <a href="https://github.com/murongg/vue-color-next" target="_blank" absolute text-4xl right-5 top-5 icon-btn i-carbon-logo-github />
    <div flex>
      <div flex flex-col mr-5>
        <sketch v-model="colors" />
        <span text-center mt-1>sketch</span>
      </div>
      <div flex flex-col mr-5>
        <chrome v-model="colors" />
        <span text-center mt-1>chrome</span>
      </div>
    </div>
  </main>
</template>
