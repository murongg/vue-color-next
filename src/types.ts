export type ModelValue = string | ModelValueObject
export interface ModelValueObject {
  color: tinycolor.ColorInput
  a?: number
  source?: string
}

export interface ColorObject {
  hsl: tinycolor.ColorFormats.HSLA
  hex: string
  hex8: string
  rgba: tinycolor.ColorFormats.RGBA
  hsv: tinycolor.ColorFormats.HSVA
  oldHue: number
  a: number
  source?: string
}

export * from './components/types'
