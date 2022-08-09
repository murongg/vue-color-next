import type { ExtractPropTypes } from 'vue-demi'
import { commonProps } from '../common.types'

export const materialProps = {
  ...commonProps,
} as const

export type MaterialProps = ExtractPropTypes<typeof materialProps>
