import tinycolor from 'tinycolor2'
import { reactive } from 'vue-demi'
import type { ColorObject, ModelValue } from '../types'

export function _colorChange(data: ModelValue, oldHue?: number): ColorObject {
  const color = typeof data === 'string' ? tinycolor(data) : tinycolor(data.color)
  const alpha = typeof data === 'string' ? 1 : color.getAlpha()

  color.setAlpha(alpha || 1)

  const hsl = color.toHsl()
  const hsv = color.toHsv()

  return {
    hsl,
    hex: color.toHexString().toUpperCase(),
    hex8: color.toHex8String().toUpperCase(),
    rgba: color.toRgb(),
    hsv,
    oldHue: oldHue || hsl.h,
    a: color.getAlpha(),
    source: typeof data === 'string' ? '' : data.source,
  }
}

export function useColor() {
  const colors = reactive<ColorObject>(_colorChange('#ff0000'))

  function setColor(data: ModelValue) {
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
