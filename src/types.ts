import type tinycolor from 'tinycolor2'
import type { Ref } from 'vue-demi'

export type ModelValue = string | tinycolor.ColorInput | Omit<ColorObject, 'oldHue' | 'source'>

export type Source = 'hsl' | 'hex' | 'hex8' | 'rgba' | 'rgb' | 'hsv'

export interface ColorObject {
  hsl?: tinycolor.ColorFormats.HSL
  hsla?: tinycolor.ColorFormats.HSLA
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

export type MaybeRef<T> = Ref<T> | T

export * from './components/types'
