import { computed, defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import { isValidHex } from '../../helpers/color'
import { EditableInput } from '../common/editableInput'
import type { TwitterProps } from './twitter.types'
import { twitterProps } from './twitter.types'

export const Twitter = defineComponent({
  name: 'Twitter',
  props: twitterProps,
  emits: [...emits],
  setup(props: TwitterProps, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor, watchColor } = useColor(modelValue)
    useEmit(emit, colors)
    watchColor((value) => {
      useEmit(emit, value)
    })

    const hsv = computed(() => {
      const hsv = colors.hsv
      return {
        h: hsv?.h.toFixed(),
        s: ((hsv?.s || 0) * 100).toFixed(),
        v: ((hsv?.v || 0) * 100).toFixed(),
      }
    })

    const hex = computed(() => {
      const hex = colors.hex
      return hex && hex.replace('#', '')
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

    const inputChange = (data: any) => {
      if (!data)
        return

      if (data['#']) {
        isValidHex(data['#']) && setColor({
          hex: data['#'],
          source: 'hex',
        })
      }
      else if (data.r || data.g || data.b || data.a) {
        setColor({
          rgba: {
            r: data.r || colors.rgba?.r,
            g: data.g || colors.rgba?.g,
            b: data.b || colors.rgba?.b,
            a: data.a || colors.rgba?.a,
          },
          source: 'rgba',
        })
      }
      else if (data.h || data.s || data.v) {
        setColor({
          hsv: {
            h: data.h || colors.hsv?.h,
            s: (data.s / 100) || colors.hsv?.s || 0,
            v: (data.v / 100) || colors.hsv?.v || 0,
          },
          source: 'hsv',
        })
      }
    }

    return {
      colors,
      handlerClick,
      equal,
      hsv,
      hex,
      inputChange,
    }
  },
  render() {
    const { triangle, width, hex, inputChange, defaultColors, equal, handlerClick } = this
    return (
      <div class={{
        'vc-twitter': true,
        'vc-twitter-hide-triangle': triangle === 'hide',
        'vc-twitter-top-left-triangle': triangle === 'top-left',
        'vc-twitter-top-right-triangle': triangle === 'top-right',
      }} style={{
        width: typeof width === 'number' ? `${width}px` : width,
      }}>
        <div class="vc-twitter-triangle-shadow"></div>
        <div class="vc-twitter-triangle"></div>
        <div class="vc-twitter-body">
          {
            defaultColors.map((color, index) => (
              <span class="vc-twitter-swatch" style={{
                background: color,
                boxShadow: `0 0 4px ${equal(color) ? color : 'transparent'}`,
              }}
                key={index} onClick={() => handlerClick(color)}>
              </span>
            ))
          }
          <div class="vc-twitter-hash">#</div>
          <EditableInput label="#" modelValue={hex} onChange={inputChange}></EditableInput>
          <div class="vc-twitter-clear"></div>
        </div>
      </div>
    )
  },
})
