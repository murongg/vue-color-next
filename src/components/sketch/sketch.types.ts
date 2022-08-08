import type { ExtractPropTypes, PropType } from 'vue-demi'
import { commonProps } from '../common.types'

export const presetColors = [
  '#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321',
  '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2',
  '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF',
  'rgba(0,0,0,0)',
]

export const sketchProps = {
  ...commonProps,
  presetColors: {
    type: Array as PropType<string[]>,
    default: () => presetColors,
  },
  disableAlpha: {
    type: Boolean,
    default: false,
  },
  disableFields: {
    type: Boolean,
    default: false,
  },
} as const

export type SketchProps = ExtractPropTypes<typeof sketchProps>
