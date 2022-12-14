import type { ExtractPropTypes, PropType } from 'vue-demi'
import { commonProps } from '../common.types'

const defaultColors = [
  '#4D4D4D', '#999999', '#FFFFFF', '#F44E3B', '#FE9200', '#FCDC00',
  '#DBDF00', '#A4DD00', '#68CCCA', '#73D8FF', '#AEA1FF', '#FDA1FF',
  '#333333', '#808080', '#CCCCCC', '#D33115', '#E27300', '#FCC400',
  '#B0BC00', '#68BC00', '#16A5A5', '#009CE0', '#7B64FF', '#FA28FF',
  '#000000', '#666666', '#B3B3B3', '#9F0500', '#C45100', '#FB9E00',
  '#808900', '#194D33', '#0C797D', '#0062B1', '#653294', '#AB149E',
]

export const compactProps = {
  ...commonProps,
  palette: {
    type: Array as PropType<string[]>,
    default() {
      return defaultColors
    },
  },
} as const

export type CompactProps = ExtractPropTypes<typeof compactProps>
