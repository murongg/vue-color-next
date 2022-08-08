import type { ExtractPropTypes, PropType } from 'vue-demi'
import type tinycolor from 'tinycolor2'
import type { ModelValue } from '../types'

export const commonProps = {
  modelValue: {
    type: [Object, String] as PropType<ModelValue>,
    default: () => { },
  },
  hsl: Object as PropType<tinycolor.ColorFormats.HSL>,
  hsla: Object as PropType<tinycolor.ColorFormats.HSLA>,
  hex: String,
  hex8: String,
  rgba: Object as PropType<tinycolor.ColorFormats.RGBA>,
  rgb: Object as PropType<tinycolor.ColorFormats.RGB>,
  hsv: Object as PropType<tinycolor.ColorFormats.HSV>,
  hsva: Object as PropType<tinycolor.ColorFormats.HSVA>,
} as const

export type CommonProps = ExtractPropTypes<typeof commonProps>
