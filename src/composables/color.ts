import tinycolor from 'tinycolor2'
import { reactive } from 'vue-demi'
import type { ColorObject } from '../types'

export function _colorChange(data: ColorObject | string, oldHue?: number): ColorObject {
  let color: tinycolor.Instance | undefined

  if (typeof data === 'string')
    color = tinycolor(data)
  else if (data.hsl)
    color = tinycolor(data.hsl)
  else if (data.hex && data.hex.length > 0)
    color = tinycolor(data.hex)
  else if (data.hsv)
    color = tinycolor(data.hsv)
  else if (data.rgba)
    color = tinycolor(data.rgba)
  else if (data.rgb)
    color = tinycolor(data.rgb)

  const alpha = typeof data === 'string' ? 1 : color?.getAlpha()

  color?.setAlpha(alpha || 1)

  const hsl = color?.toHsl()
  const hsv = color?.toHsv()
  const rgba = color?.toRgb()

  return {
    hsl,
    hex: color?.toHexString().toUpperCase(),
    hex8: color?.toHex8String().toUpperCase(),
    rgba,
    rgb: {
      r: rgba!.r,
      g: rgba!.g,
      b: rgba!.b,
    },
    hsv,
    oldHue: oldHue || hsl?.h,
    a: color?.getAlpha(),
    format: color?.getFormat(),
    source: typeof data === 'string' ? undefined : data.source,
  }
}

export function useColor() {
  const colors = reactive<ColorObject>({})

  function setColor(data: ColorObject | string) {
    const { hsl, hex, hex8, rgba, hsv, oldHue, a } = _colorChange(data)
    colors.a = a
    colors.hsl = hsl
    colors.hex = hex
    colors.hex8 = hex8
    colors.rgba = rgba
    colors.hsv = hsv
    colors.oldHue = oldHue
  }
  return {
    setColor,
    colors,
  }
}
