<script setup lang="ts">
const colors = ref('#194d33e6')
</script>

<template>
  <div>
    <div i-carbon-campsite text-4xl inline-block />
    <sketch v-model="colors" />
  </div>
</template>
