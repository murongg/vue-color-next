import { nextTick, reactive, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { DEFAULT_SATURATION, Slider } from '../src'

const colors = ref('#ff0000')

describe('Slider Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Slider v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-slider')
  })

  it('swatches', async () => {
    const swatches = reactive([
      { s: DEFAULT_SATURATION, l: 0.8 },
      { s: DEFAULT_SATURATION, l: 0.65 },
    ])
    const wrapper = mount(() => <Slider v-model={colors.value} swatches={swatches} />)
    expect(wrapper.findAll('.vc-slider-swatch').length).toBe(swatches.length)
    swatches.push({ s: DEFAULT_SATURATION, l: 0.5 })
    await nextTick()
    expect(wrapper.findAll('.vc-slider-swatch').length).toBe(swatches.length)
  })
})
