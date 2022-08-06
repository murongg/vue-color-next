import type tinycolor from 'tinycolor2'

export type ModelValue = string | Omit<ColorObject, 'oldHue' | 'source'>

export type Source = 'hsl' | 'hex' | 'hex8' | 'rgba' | 'rgb' | 'hsv'

export interface ColorObject {
  hsl?: tinycolor.ColorFormats.HSLA
  hex?: string
  hex8?: string
  rgba?: tinycolor.ColorFormats.RGBA
  rgb?: tinycolor.ColorFormats.RGB
  hsv?: tinycolor.ColorFormats.HSVA
  format?: string
  oldHue?: number
  a?: number
  source?: Source
}

export * from './components/types'
