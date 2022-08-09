import { ref } from 'vue-demi'
import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Material } from '../src'

const colors = ref('#ff0000')

describe('Material Component', () => {
  it('create', async () => {
    const wrapper = mount(() => <Material v-model={colors.value} />)
    expect(wrapper.classes()).toContain('vc-material')
  })
})
