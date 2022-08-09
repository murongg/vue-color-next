import { nextTick, reactive, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Compact } from '../src'

const colors = ref('#ff0000')

describe('Compact Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Compact v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-compact')
  })

  it('swatches', async () => {
    const palettes = reactive(['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00'])
    const wrapper = mount(() => <Compact v-model={colors.value} palette={palettes} />)
    expect(wrapper.findAll('.vc-compact-color-item').length).toBe(palettes.length)
    palettes.push('#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF')
    await nextTick()
    expect(wrapper.findAll('.vc-compact-color-item').length).toBe(palettes.length)
  })
})
