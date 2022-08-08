import type { ExtractPropTypes } from 'vue-demi'
import { commonProps } from '../common.types'

export const chormeProps = {
  ...commonProps,
  disableAlpha: {
    type: Boolean,
    default: false,
  },
  disableFields: {
    type: Boolean,
    default: false,
  },
} as const

export type ChromeProps = ExtractPropTypes<typeof chormeProps>
