import { nextTick, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Chrome } from '../src'

const colors = ref('#ff0000')

describe('Chrome Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Chrome v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-chrome')
  })
  it('disableAlpha', async () => {
    const disableAlpha = ref(true)
    const wrapper = mount(() => <Chrome v-model={colors.value} disableAlpha={disableAlpha.value} />)
    expect(wrapper.classes()).toContain('vc-chrome__disable-alpha')
    expect(wrapper.find('.vc-chrome-alpha-wrap').exists()).toBeFalsy()
    disableAlpha.value = false
    await nextTick()
    expect(wrapper.find('.vc-chrome__disable-alpha').exists()).toBeFalsy()
    expect(wrapper.find('.vc-chrome-alpha-wrap').exists()).toBeTruthy()
  })
  it('disableFields', async () => {
    const disableFields = ref(true)
    const wrapper = mount(() => <Chrome v-model={colors.value} disableFields={disableFields.value} />)
    expect(wrapper.find('.vc-chrome-field').exists()).toBeFalsy()
    disableFields.value = false
    await nextTick()
    expect(wrapper.find('.vc-chrome-field').exists()).toBeTruthy()
  })
})
