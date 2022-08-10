import { computed, defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import type { GrayscaleProps } from './grayscale.types'
import { grayscaleProps } from './grayscale.types'

export const Grayscale = defineComponent({
  name: 'Grayscale',
  props: grayscaleProps,
  emits: [...emits],
  setup(props: GrayscaleProps, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor, watchColor } = useColor(modelValue)
    useEmit(emit, colors)
    watchColor((value) => {
      useEmit(emit, value)
    })

    const handlerClick = (c: string) => {
      setColor({
        hex: c,
        source: 'hex',
      })
    }

    const paletteUpperCase = computed(() => props.palette.map(c => c.toUpperCase()))

    return {
      colors,
      handlerClick,
      paletteUpperCase,
    }
  },
  render() {
    const { colors, handlerClick, paletteUpperCase } = this
    return (
      <div role="application" aria-label="Grayscale color picker" class="vc-grayscale">
        <ul class="vc-grayscale-colors" role="listbox">
          {
            paletteUpperCase.map(c => (
              <li
                role="option"
                aria-label={`color:${c}`}
                aria-selected={c === colors.hex?.toUpperCase()}
                key={c}
                class={{ 'vc-grayscale-color-item': true, 'vc-grayscale-color-item--white': c === '#FFFFFF' }}
                style={{ background: c }}
                onClick={() => handlerClick(c)}
              >
                <div class="vc-grayscale-dot" v-show={c === colors.hex?.toUpperCase()}></div>
              </li>
            ))
          }
        </ul>
      </div>
    )
  },
})
