import { nextTick, reactive, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { TwitterTriangle } from '../src'
import { Twitter } from '../src'

const colors = ref('#ff0000')

describe('Twitter Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Twitter v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-twitter')
  })

  it('width', async () => {
    const width = ref(0)
    const wrapper = mount(() => <Twitter v-model={colors.value} width={width.value} />)
    expect(wrapper.find('.vc-twitter').element.getAttribute('style')).toContain(`${width.value}px`)
    width.value = 100
    await nextTick()
    expect(wrapper.find('.vc-twitter').element.getAttribute('style')).toContain(`${width.value}px`)
  })

  it('defaultColors', async () => {
    let wrapper = mount(() => <Twitter v-model={colors.value} />)
    expect(wrapper.findAll('.vc-twitter-swatch').length).toBe(10)
    const defaultColors = reactive(['#fff', '#000'])
    wrapper = mount(() => <Twitter v-model={colors.value} defaultColors={defaultColors} />)
    expect(wrapper.findAll('.vc-twitter-swatch').length).toBe(defaultColors.length)
    defaultColors.push('red')
    await nextTick()
    expect(wrapper.findAll('.vc-twitter-swatch').length).toBe(defaultColors.length)
  })

  it('triangle', async () => {
    const triangle = ref<TwitterTriangle>('hide')
    const wrapper = mount(() => <Twitter v-model={colors.value} triangle={triangle.value} />)
    expect(wrapper.find('.vc-twitter-hide-triangle').exists()).toBeTruthy()
    expect(wrapper.find('.vc-twitter-top-left-triangle').exists()).toBeFalsy()
    expect(wrapper.find('.vc-twitter-top-right-triangle').exists()).toBeFalsy()
    triangle.value = 'top-left'
    await nextTick()
    expect(wrapper.find('.vc-twitter-hide-triangle').exists()).toBeFalsy()
    expect(wrapper.find('.vc-twitter-top-left-triangle').exists()).toBeTruthy()
    expect(wrapper.find('.vc-twitter-top-right-triangle').exists()).toBeFalsy()
    triangle.value = 'top-right'
    await nextTick()
    expect(wrapper.find('.vc-twitter-hide-triangle').exists()).toBeFalsy()
    expect(wrapper.find('.vc-twitter-top-left-triangle').exists()).toBeFalsy()
    expect(wrapper.find('.vc-twitter-top-right-triangle').exists()).toBeTruthy()
  })
})
