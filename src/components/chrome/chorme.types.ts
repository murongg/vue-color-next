import type { ExtractPropTypes, PropType } from 'vue-demi'
import type { ModelValue } from '../../types'

export const chormeProps = {
  modelValue: {
    type: [Object, String] as PropType<ModelValue>,
    default: () => { },
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

export type ChromeProps = ExtractPropTypes<typeof chormeProps>
