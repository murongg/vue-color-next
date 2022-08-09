<script setup lang="ts">
import type { ModelValue } from '../../src/types'
const colors = ref<ModelValue>('#84ACDAFF')

const color = computed(() => {
  let color = ''
  if (typeof colors.value === 'string') { color = colors.value }
  else {
    const rgba = colors.value.rgba
    color = `rgba(${rgba?.a}, ${rgba?.g}, ${rgba?.b}, ${rgba?.a})`
  }
  return color
})

const colorObj = reactive<any>({
  hex: '',
  hex8: '',
  rgb: {},
  rgba: {},
  hsl: {},
  hsla: {},
  hsv: {},
  hsva: {},
})

</script>

<template>
  <main font-sans w-screen min-h-screen p="x-4 y-10" text="white dark:gray-200" :style="{ background: color }">
    <a
      href="https://github.com/murongg/vue-color-next" target="_blank" absolute text-4xl right-5 top-5 icon-btn
      i-carbon-logo-github
    />
    <h1 text-4xl text-center>
      Vue Color
    </h1>
    <h2 text-2xl text-center mt-4>
      🎨 Vue Color Picker Component for Vue 3.x
    </h2>
    <div mt-10 flex flex-wrap justify-between>
      <div
        v-for="obj in Object.keys(colorObj)" :key="obj" h="200px" mb-8 mr-8 flex-1 shadow-xl inline-block px-5 py-4
        bg-white rounded-1 opacity-80 hover:opacity-100 :style="{ color: color }"
      >
        <div text="center" mb-2 font-extrabold>
          {{ obj.toLocaleUpperCase() }}
        </div>
        <ul v-if="typeof colorObj[obj] === 'object'" text="center sm">
          <li v-for="c in Object.keys(colorObj[obj])" :key="c">
            {{ c.toLocaleUpperCase() }} : {{ colorObj[obj][c] }}
          </li>
        </ul>
        <div v-else text="center sm">
          {{ colorObj[obj] }}
        </div>
      </div>
    </div>
    <div flex>
      <div flex flex-col mr-5>
        <Sketch
          v-model="colors" v-model:rgb="colorObj.rgb" v-model:rgba="colorObj.rgba" v-model:hsl="colorObj.hsl"
          v-model:hsla="colorObj.hsla" v-model:hex="colorObj.hex" v-model:hex8="colorObj.hex8"
          v-model:hsv="colorObj.hsv" v-model:hsva="colorObj.hsva"
        />
        <span text-center mt-1>Sketch</span>
      </div>
      <div flex flex-col mr-5>
        <Chrome v-model="colors" />
        <span text-center mt-1>Chrome</span>
      </div>
      <div flex flex-col mr-5>
        <Photoshop v-model="colors" />
        <span text-center mt-1>Photoshop</span>
      </div>
      <div flex flex-col mr-5>
        <Material v-model="colors" />
        <span text-center mt-1>Material</span>
      </div>
      <div flex flex-col mr-5>
        <Slider v-model="colors" />
        <span text-center mt-1>Material</span>
      </div>
    </div>
  </main>
</template>
