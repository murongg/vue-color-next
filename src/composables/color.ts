import tinycolor from 'tinycolor2'
import { isRef, reactive, unref, watch } from 'vue-demi'
import type { ColorObject, MaybeRef, ModelValue, OmitColorObject } from '../types'

export function _colorChange(data: ColorObject | string, oldHue?: number): ColorObject {
  let color: tinycolor.Instance | undefined
  if (typeof data === 'string')
    color = tinycolor(data)
  else if (data.hsla)
    color = tinycolor(data.hsla)
  else if (data.hsl)
    color = tinycolor(data.hsl)
  else if (data.hex && data.hex.length > 0)
    color = tinycolor(data.hex)
  else if (data.hsva)
    color = tinycolor(data.hsva)
  else if (data.hsv)
    color = tinycolor(data.hsv)
  else if (data.rgba)
    color = tinycolor(data.rgba)
  else if (data.rgb)
    color = tinycolor(data.rgb)
  else if (data instanceof tinycolor)
    color = tinycolor(data)

  const alpha = typeof data === 'string' ? color?.getAlpha() : (data.a || color?.getAlpha())

  color?.setAlpha(alpha || 1)
  const hsla = color?.toHsl()
  const hsva = color?.toHsv()
  const rgba = color?.toRgb()

  if (hsla?.s === 0) {
    if (typeof data === 'object')
      hsva!.h = hsla.h = data.hsla?.h || oldHue || 0
  }

  return {
    hsl: {
      h: hsla?.h || 0,
      s: hsla?.s || 0,
      l: hsla?.l || 0,
    },
    hsla,
    hex: color?.toHexString().toUpperCase(),
    hex8: color?.toHex8String().toUpperCase(),
    rgba,
    rgb: {
      r: rgba!.r,
      g: rgba!.g,
      b: rgba!.b,
    },
    hsv: {
      h: hsva!.h,
      s: hsva!.s,
      v: hsva!.v,
    },
    hsva,
    oldHue: oldHue || hsla?.h,
    a: color?.getAlpha(),
    format: color?.getFormat(),
    source: typeof data === 'string' ? undefined : data.source,
  }
}

export function useColor<T = ModelValue>(initValue: MaybeRef<T>) {
  const colors = reactive<ColorObject>({})

  function setColor(data: ColorObject | string) {
    const { hsl, hsla, hex, hex8, rgba, rgb, hsv, hsva, oldHue, a } = _colorChange(data)
    colors.a = a
    colors.hsla = hsla
    colors.hsl = hsl
    colors.hex = hex
    colors.hex8 = hex8
    colors.rgba = rgba
    colors.rgb = rgb
    colors.hsv = hsv
    colors.hsva = hsva
    colors.oldHue = oldHue
  }

  setColor(unref(initValue))
  if (isRef(initValue)) {
    watch(initValue, (value, oldValue) => {
      if (typeof initValue.value === 'string') {
        if (value !== oldValue)
          setColor(value)
      }
      else {
        if ((initValue.value as ColorObject).hex !== (oldValue as ColorObject).hex)
          setColor(value)
      }
    })
  }

  const watchColor = (callback: (value: OmitColorObject) => void) => {
    watch(colors, () => {
      const value = {
        hsl: colors.hsl,
        hsla: colors.hsla,
        hex: colors.hex,
        hex8: colors.hex8,
        rgba: colors.rgba,
        rgb: colors.rgb,
        hsv: colors.hsv,
        hsva: colors.hsva,
        format: colors.format,
        a: colors.a,
      }
      callback(value)
    })
  }

  return {
    setColor,
    watchColor,
    colors,
  }
}
