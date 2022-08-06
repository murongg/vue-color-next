import { ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Sketch } from '../src'

const colors = ref('#ff0000')

describe('Sketch Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Sketch v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-sketch')
  })
  it('test saturation', async () => {
    const wrapper = mount(() => <Sketch v-model={colors.value} />)
    const saturation = wrapper.find('.vc-saturation')
    expect(saturation.element.getAttribute('style')).toBe('background: rgb(255, 0, 0);')
    const saturationPointer = wrapper.find('.vc-saturation-pointer')
    expect(saturationPointer.element.getAttribute('style')).toBe('top: 1%; left: 100%;')
  })

  it('test hue', async () => {
    const wrapper = mount(() => <Sketch v-model={colors} />)
    const hue = wrapper.find('.vc-hue')
    expect(hue.classes()).toContain('vc-hue--horizontal')
    const hueContainer = wrapper.find('.vc-hue-container')
    expect(hueContainer.element.getAttribute('aria-valuenow')).toBe('0')
    const huePointer = wrapper.find('.vc-hue-pointer')
    expect(huePointer.element.getAttribute('style')).toBe('top: 0px; left: 0%;')
  })

  it('test alpha', async () => {
    const wrapper = mount(() => <Sketch v-model={colors} />)
    const alphaPointer = wrapper.find('.vc-alpha-pointer')
    expect(alphaPointer.element.getAttribute('style')).toBe('left: 100%;')
  })
})
