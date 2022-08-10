import type { ExtractPropTypes, PropType } from 'vue-demi'
import material from 'material-colors'
import { commonProps } from '../common.types'

const colorMap = [
  'red', 'pink', 'purple', 'deepPurple',
  'indigo', 'blue', 'lightBlue', 'cyan',
  'teal', 'green', 'lightGreen', 'lime',
  'yellow', 'amber', 'orange', 'deepOrange',
  'brown', 'blueGrey', 'black',
]
const colorLevel = ['900', '700', '500', '300', '100']
const defaultColors = () => {
  const colors: string[][] = []
  colorMap.forEach((type) => {
    let typeColor: string[] = []
    if (type.toLowerCase() === 'black' || type.toLowerCase() === 'white') {
      typeColor = typeColor.concat(['#000000', '#FFFFFF'])
    }
    else {
      colorLevel.forEach((level) => {
        const color = (material as any)[type][level]
        typeColor.push(color.toUpperCase())
      })
    }
    colors.push(typeColor)
  })
  return colors
}

export const swatchesProps = {
  ...commonProps,
  palette: {
    type: Array as PropType<string[][]>,
    default() {
      return defaultColors()
    },
  },
} as const

export type SwatchesProps = ExtractPropTypes<typeof swatchesProps>
