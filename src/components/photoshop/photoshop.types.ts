import type { ExtractPropTypes } from 'vue-demi'
import { commonProps } from '../common.types'

export const photoshopProps = {
  ...commonProps,
  head: {
    type: String,
    default: 'Color Picker',
  },
  disableFields: {
    type: Boolean,
    default: false,
  },
  hasResetButton: {
    type: Boolean,
    default: true,
  },
  acceptLabel: {
    type: String,
    default: 'OK',
  },
  cancelLabel: {
    type: String,
    default: 'Cancel',
  },
  resetLabel: {
    type: String,
    default: 'Reset',
  },
  newLabel: {
    type: String,
    default: 'new',
  },
  currentLabel: {
    type: String,
    default: 'current',
  },
} as const

export type PhotoshopProps = ExtractPropTypes<typeof photoshopProps>
