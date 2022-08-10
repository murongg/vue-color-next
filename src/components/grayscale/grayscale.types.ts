import type { ExtractPropTypes, PropType } from 'vue-demi'
import { commonProps } from '../common.types'

const defaultColors = [
  '#FFFFFF', '#F2F2F2', '#E6E6E6', '#D9D9D9', '#CCCCCC', '#BFBFBF', '#B3B3B3',
  '#A6A6A6', '#999999', '#8C8C8C', '#808080', '#737373', '#666666', '#595959',
  '#4D4D4D', '#404040', '#333333', '#262626', '#0D0D0D', '#000000',
]

export const grayscaleProps = {
  ...commonProps,
  palette: {
    type: Array as PropType<string[]>,
    default() {
      return defaultColors
    },
  },
} as const

export type GrayscaleProps = ExtractPropTypes<typeof grayscaleProps>
