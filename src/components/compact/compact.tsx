import { computed, defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import type { CompactProps } from './compact.types'
import { compactProps } from './compact.types'

export const Compact = defineComponent({
  name: 'Compact',
  props: compactProps,
  emits: [...emits],
  setup(props: CompactProps, { emit }) {
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
      <div role="application" aria-label="Compact color picker" class="vc-compact">
        <ul class="vc-compact-colors" role="listbox">
          {
            paletteUpperCase.map(c => (
              <li
                role="option"
                aria-label={`color:${c}`}
                aria-selected={c === colors.hex?.toUpperCase()}
                key={c}
                class={{ 'vc-compact-color-item': true, 'vc-compact-color-item--white': c === '#FFFFFF' }}
                style={{ background: c }}
                onClick={() => handlerClick(c)}
              ></li>
            ))
          }
        </ul>
      </div>
    )
  },
})
