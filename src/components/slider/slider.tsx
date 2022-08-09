import { computed, defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { Hue } from '../common/hue'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import type { SliderProps } from './slider.types'
import { DEFAULT_SATURATION, sliderProps } from './slider.types'

export const Slider = defineComponent({
  name: 'Slider',
  props: sliderProps,
  emits: [...emits],
  setup(props: SliderProps, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor, watchColor } = useColor(modelValue)
    useEmit(emit, colors)
    watchColor((value) => {
      useEmit(emit, value)
    })

    const normalizedSwatches = computed(() => {
      const swatches = props.swatches
      return swatches.map((swatch) => {
        // to be compatible with another data format ['.80', '.65', '.50', '.35', '.20']
        if (typeof swatch !== 'object') {
          return {
            s: DEFAULT_SATURATION,
            l: swatch,
          }
        }
        return swatch
      })
    })

    const handleSwClick = (index: number, swatch: { s: number; l: number }) => {
      setColor({
        hsl: {
          h: colors.hsl?.h || 0,
          s: swatch.s,
          l: swatch.l,
        },
        source: 'hsl',
      })
    }

    const isActive = (swatch: { s: number; l: number }) => {
      const hsl = colors.hsl
      if (hsl?.l === 1 && swatch.l === 1)
        return true

      if (hsl?.l === 0 && swatch.l === 0)
        return true

      return (
        hsl && (Math.abs(hsl.l - swatch.l) < 0.01 && Math.abs(hsl.s - swatch.s) < 0.01)
      )
    }

    return {
      colors,
      setColor,
      normalizedSwatches,
      handleSwClick,
      isActive,
    }
  },
  render() {
    const { colors, setColor, normalizedSwatches, handleSwClick, isActive } = this
    return (
      <div role="application" aria-label="Slider color picker" class="vc-slider">
        <div class="vc-slider-hue-warp">
          <Hue colors={colors} onChange={setColor} />
        </div>
        <div class="vc-slider-swatches" role="group">
          {
            normalizedSwatches.map((swatch, index) => (
              <div class="vc-slider-swatch" key={index} data-index={index}
                aria-label={`color:${colors.hex}`}
                role="button"
                onClick={() => handleSwClick(index, swatch)}
              >
                <div
                  class={{ 'vc-slider-swatch-picker': true, 'vc-slider-swatch-picker--active': isActive(swatch), 'vc-slider-swatch-picker--white': swatch.l === 1 }}
                  style={{ background: `hsl(${colors.hsl?.h}, ${swatch.s * 100}%, ${swatch.l * 100}%)` }}
                ></div>
              </div>
            ))
          }
        </div >
      </div >
    )
  },
})
