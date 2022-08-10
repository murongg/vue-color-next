import type { ExtractPropTypes, PropType } from 'vue-demi'
import { commonProps } from '../common.types'

const defaultColors = [
  '#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3',
  '#EB144C', '#F78DA7', '#9900EF',
]

export type TwitterTriangle = 'hide' | 'top-left' | 'top-right'

export const twitterProps = {
  ...commonProps,
  width: {
    type: [String, Number] as PropType<string | number>,
    default: 276,
  },
  defaultColors: {
    type: Array as PropType<string[]>,
    default() {
      return defaultColors
    },
  },
  triangle: {
    type: String as PropType<TwitterTriangle>,
    default: 'top-left',
    validator(value: string) {
      return ['hide', 'top-left', 'top-right'].includes(value)
    },
  },
} as const

export type TwitterProps = ExtractPropTypes<typeof twitterProps>
