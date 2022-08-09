import type { ExtractPropTypes, PropType } from 'vue-demi'
import { commonProps } from '../common.types'

export const DEFAULT_SATURATION = 0.5

export type SliderSwatches = number[] | { s: number; l: number }[]

export const sliderProps = {
  ...commonProps,
  swatches: {
    type: Array as PropType<SliderSwatches>,
    default() {
      // also accepts: ['.80', '.65', '.50', '.35', '.20']
      return [
        { s: DEFAULT_SATURATION, l: 0.8 },
        { s: DEFAULT_SATURATION, l: 0.65 },
        { s: DEFAULT_SATURATION, l: 0.5 },
        { s: DEFAULT_SATURATION, l: 0.35 },
        { s: DEFAULT_SATURATION, l: 0.2 },
      ]
    },
  },
} as const

export type SliderProps = ExtractPropTypes<typeof sliderProps>
