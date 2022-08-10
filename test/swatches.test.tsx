import { nextTick, reactive, ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Swatches } from '../src'

const colors = ref('#ff0000')

describe('Swatches Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Swatches v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-swatches')
  })

  it('palette', async () => {
    const palettes = reactive([['#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00']])
    const wrapper = mount(() => <Swatches v-model={colors.value} palette={palettes} />)
    expect(wrapper.findAll('.vc-swatches-color-it').length).toBe(6)
    palettes.push(['#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF'])
    await nextTick()
    expect(wrapper.findAll('.vc-swatches-color-it').length).toBe(12)
  })
})
