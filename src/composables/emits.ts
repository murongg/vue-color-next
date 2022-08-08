import type { OmitColorObject } from '../types'

type EmitFn<Options = ColorEmitsOptions> = (event: Options, ...args: any[]) => void

type ColorEmitsOptions = 'update:modelValue' |
'update:hsl' |
'update:hsla' |
'update:hex' |
'update:hex8' |
'update:rgba' |
'update:rgb' |
'update:hsv' |
'update:hsva'

export function useEmit(emit: EmitFn<ColorEmitsOptions>, value: OmitColorObject) {
  emit('update:modelValue', value)
  emit('update:hsl', value.hsl)
  emit('update:hsla', value.hsla)
  emit('update:hex', value.hex)
  emit('update:hex8', value.hex8)
  emit('update:rgba', value.rgba)
  emit('update:rgb', value.rgb)
  emit('update:hsv', value.hsv)
  emit('update:hsva', value.hsva)
}
