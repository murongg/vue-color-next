<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { ModelValue } from '../../src/types'
const colors = ref<ModelValue>('#84ACDAFF')

const color = computed(() => {
  return typeof colors.value === 'string' ? colors.value : colors.value.hex
})
const main = ref(null)
const { width: bgWidth, height: bgHeight } = useElementSize(main)

const bgStyle = computed<StyleValue>(() => {
  return {
    background: color.value,
    opacity: colors.value.a || 0,
    height: `${bgHeight.value + 80}px`,
    width: `${bgWidth.value + 32}px`,
  }
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
  <main ref="main" relative font-sans w-screen min-h-screen p="x-4 y-10" text="white dark:gray-200">
    <div absolute top-0 left-0 z--9999 :style="bgStyle" />
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
    <div mt-8 flex flex-wrap justify-between>
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
    <div flex flex-wrap>
      <div flex flex-col>
        <div flex>
          <div flex flex-col mr-5>
            <Chrome v-model="colors" />
            <span text-center mt-1>Chrome</span>
          </div>
          <div flex flex-col mr-5>
            <Sketch
              v-model="colors" v-model:rgb="colorObj.rgb" v-model:rgba="colorObj.rgba" v-model:hsl="colorObj.hsl"
              v-model:hsla="colorObj.hsla" v-model:hex="colorObj.hex" v-model:hex8="colorObj.hex8"
              v-model:hsv="colorObj.hsv" v-model:hsva="colorObj.hsva"
            />
            <span text-center mt-1>Sketch</span>
          </div>
        </div>
        <div mt--5>
          <Twitter v-model="colors" />
          <span text-center mt-1>Twitter</span>
        </div>
      </div>

      <div flex flex-col mr-5>
        <Photoshop v-model="colors" />
        <span text-center mt-1>Photoshop</span>
      </div>
      <div flex flex-col flex-wrap mr-5>
        <div flex>
          <div>
            <Swatches v-model="colors" />
            <span text-center mt-1>Swatches</span>
          </div>
          <div ml-5>
            <div>
              <Compact v-model="colors" />
              <span text-center mt-1>Compact</span>
            </div>
            <div flex>
              <div>
                <Material v-model="colors" />
                <span text-center mt-1>Material</span>
              </div>
              <div ml-2>
                <Grayscale v-model="colors" />
                <span text-center mt-1>Grayscale</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <Slider v-model="colors" mt-5 />
          <span text-center mt-1>Slider</span>
        </div>
      </div>
    </div>
  </main>
</template>
