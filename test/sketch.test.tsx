import { nextTick, reactive, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Sketch } from '../src'

const colors = ref('#ff0000')

describe('Sketch Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Sketch v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-sketch')
  })
  it('presetColors', async () => {
    const presetColors = reactive(['#D0021B', '#F5A623'])
    const wrapper = mount(() => <Sketch v-model={colors.value} presetColors={presetColors} />)
    expect(wrapper.findAll('.vc-sketch-presets-color').map((preset) => {
      const strs = preset.element.getAttribute('aria-label')?.split('Color:') || []
      return strs[strs?.length - 1]
    })).toEqual(presetColors)
    presetColors.push('#fff')
    await nextTick()
    expect(wrapper.findAll('.vc-sketch-presets-color').map((preset) => {
      const strs = preset.element.getAttribute('aria-label')?.split('Color:') || []
      return strs[strs?.length - 1]
    })).toEqual(presetColors)
  })
  it('disableAlpha', async () => {
    const disableAlpha = ref(true)
    const wrapper = mount(() => <Sketch v-model={colors.value} disableAlpha={disableAlpha.value} />)
    expect(wrapper.classes()).toContain('vc-sketch__disable-alpha')
    expect(wrapper.find('.vc-sketch-alpha-wrap').exists()).toBeFalsy()
    disableAlpha.value = false
    await nextTick()
    expect(wrapper.find('.vc-sketch__disable-alpha').exists()).toBeFalsy()
    expect(wrapper.find('.vc-sketch-alpha-wrap').exists()).toBeTruthy()
  })
  it('disableFields', async () => {
    const disableFields = ref(true)
    const wrapper = mount(() => <Sketch v-model={colors.value} disableFields={disableFields.value} />)
    expect(wrapper.find('.vc-sketch-field').exists()).toBeFalsy()
    disableFields.value = false
    await nextTick()
    expect(wrapper.find('.vc-sketch-field').exists()).toBeTruthy()
  })
})
