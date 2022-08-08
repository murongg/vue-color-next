import { nextTick, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Photoshop } from '../src'

const colors = ref('#ff0000')

describe('Photoshop Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Photoshop v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-photoshop')
  })
  it('disableFields', async () => {
    const disableFields = ref(false)
    const wrapper = mount(() => <Photoshop v-model={colors.value} disableFields={disableFields.value} />)
    expect(wrapper.find('.vc-ps-actions').exists()).toBeTruthy()
    disableFields.value = true
    await nextTick()
    expect(wrapper.find('.vc-photoshop__disable-fields')).toBeTruthy()
    expect(wrapper.find('.vc-ps-controls__disable-fields')).toBeTruthy()
    expect(wrapper.find('.vc-ps-actions').exists()).toBeFalsy()
  })
  it('hasResetButton', async () => {
    const hasResetButton = ref(false)
    const wrapper = mount(() => <Photoshop v-model={colors.value} hasResetButton={hasResetButton.value} />)
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'reset\']').exists()).toBeFalsy()
    hasResetButton.value = true
    await nextTick()
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'reset\']').exists()).toBeTruthy()
  })
  it('acceptLabel', async () => {
    const acceptLabel = ref('ok')
    const wrapper = mount(() => <Photoshop v-model={colors.value} acceptLabel={acceptLabel.value} />)
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'acceptLabel\']').text()).toBe(acceptLabel.value)
    acceptLabel.value = 'hhh'
    await nextTick()
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'acceptLabel\']').text()).toBe(acceptLabel.value)
  })
  it('cancelLabel', async () => {
    const cancelLabel = ref('cancel')
    const wrapper = mount(() => <Photoshop v-model={colors.value} cancelLabel={cancelLabel.value} />)
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'cancelLabel\']').text()).toBe(cancelLabel.value)
    cancelLabel.value = 'hhh'
    await nextTick()
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'cancelLabel\']').text()).toBe(cancelLabel.value)
  })
  it('resetLabel', async () => {
    const resetLabel = ref('reset')
    const wrapper = mount(() => <Photoshop v-model={colors.value} hasResetButton resetLabel={resetLabel.value} />)
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'reset\']').text()).toBe(resetLabel.value)
    resetLabel.value = 'hhh'
    await nextTick()
    expect(wrapper.find('.vc-ps-ac-btn[aria-label=\'reset\']').text()).toBe(resetLabel.value)
  })
  it('newLabel', async () => {
    const newLabel = ref('reset')
    const wrapper = mount(() => <Photoshop v-model={colors.value} hasResetButton newLabel={newLabel.value} />)
    expect(wrapper.find('.vc-ps-previews .vc-ps-previews__label').text()).toBe(newLabel.value)
    newLabel.value = 'hhh'
    await nextTick()
    expect(wrapper.find('.vc-ps-previews .vc-ps-previews__label').text()).toBe(newLabel.value)
  })
  it('currentLabel', async () => {
    const currentLabel = ref('reset')
    const wrapper = mount(() => <Photoshop v-model={colors.value} hasResetButton newLabel={currentLabel.value} />)
    expect(wrapper.find('.vc-ps-previews__label').text()).toBe(currentLabel.value)
    currentLabel.value = 'hhh'
    await nextTick()
    expect(wrapper.find('.vc-ps-previews__label').text()).toBe(currentLabel.value)
  })
})
