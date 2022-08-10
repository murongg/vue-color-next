import { defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import type { SwatchesProps } from './swatches.types'
import { swatchesProps } from './swatches.types'

export const Swatches = defineComponent({
  name: 'Swatches',
  props: swatchesProps,
  emits: [...emits],
  setup(props: SwatchesProps, { emit }) {
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

    const equal = (color: string) => {
      return color.toLowerCase() === colors.hex?.toLowerCase()
    }

    return {
      colors,
      handlerClick,
      equal,
    }
  },
  render() {
    const { colors, handlerClick, palette, equal } = this
    return (
      <div role="application" aria-label="Swatches color picker" class="vc-swatches" data-pick={colors.hex}>
        <div class="vc-swatches-box" role="listbox">
          {
            palette.map((group, $idx) => (
              <div class="vc-swatches-color-group" key={$idx}>
                {
                  group.map(c => (
                    <div class={['vc-swatches-color-it', { 'vc-swatches-color--white': c === '#FFFFFF' }]}
                      role="option"
                      aria-label={`Color:${c}`}
                      aria-selected={equal(c)}
                      key={c}
                      data-color={c}
                      style={{ background: c }}
                      onClick={() => handlerClick(c)}
                    >
                      <div class="vc-swatches-pick" v-show={equal(c)}>
                        <svg style="width: 24px; height:24px;" viewBox="0 0 24 24">
                          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                        </svg>
                      </div>
                    </div>
                  ))
                }
              </div>
            ))
          }
        </div>
      </div >
    )
  },
})
