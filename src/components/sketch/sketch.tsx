import { Fragment, computed, defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { Saturation } from '../common/saturation'
import { Alpha } from '../common/alpha'
import { Checkboard } from '../common/checkboard'
import { EditableInput } from '../common/editableInput'
import { Hue } from '../common/hue'
import { isTransparent, isValidHex } from '../../helpers/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import type { SketchProps } from './sketch.types'
import { sketchProps } from './sketch.types'

export const Sketch = defineComponent({
  name: 'Sketch',
  props: sketchProps,
  emits: [...emits],
  setup(props: SketchProps, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor, watchColor } = useColor(modelValue)
    useEmit(emit, colors)
    watchColor((value) => {
      useEmit(emit, value)
    })

    const hex = computed(() => {
      const result = (colors.a || 0) < 1 ? colors.hex8 : colors.hex
      return result?.replace('#', '')
    })

    const activeColor = computed(() => {
      const rgba = colors.rgba
      return `rgba(${[rgba?.r, rgba?.g, rgba?.b, rgba?.a].join(',')})`
    })

    const inputChange = (data: any) => {
      if (!data)
        return

      if (data.hex) {
        isValidHex(data.hex) && setColor({
          hex: data.hex,
          source: 'hex',
        })
      }
      else if (data.r || data.g || data.b || data.a) {
        setColor({
          rgba: {
            r: data.r || colors.rgba?.r,
            g: data.g || colors.rgba?.g,
            b: data.b || colors.rgba?.b,
            a: data.a || colors.rgba?.a,
          },
          source: 'rgba',
        })
      }
    }

    const handlePreset = (c: string) => {
      setColor({
        hex: c,
        source: 'hex',
      })
    }

    return {
      colors,
      setColor,
      inputChange,
      activeColor,
      hex,
      handlePreset,
    }
  },
  render() {
    const { colors, setColor, disableAlpha, disableFields, activeColor, inputChange, handlePreset, hex, presetColors } = this
    return (
      <div role="application" aria-label="Sketch color picker" class={['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']}>
        <div class="vc-sketch-saturation-wrap">
          <Saturation colors={colors} onChange={setColor} />
        </div>
        <div class="vc-sketch-controls">
          <div class="vc-sketch-sliders">
            <div class="vc-sketch-hue-wrap">
              <Hue colors={colors} onChange={setColor} />
            </div>
            {
              !disableAlpha && <div class="vc-sketch-alpha-wrap">
                <Alpha colors={colors} onChange={setColor} />
              </div>
            }
          </div>
          <div class="vc-sketch-color-wrap">
            <div aria-label={`Current color is ${activeColor}`} class="vc-sketch-active-color" style={{ background: activeColor }}></div>
            <Checkboard />
          </div>
        </div>
        {!disableFields && <div class="vc-sketch-field">
          <div class="vc-sketch-field--double">
            <EditableInput label="hex" modelValue={hex} onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-sketch-field--single">
            <EditableInput label="r" modelValue={colors.rgba?.r} onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-sketch-field--single">
            <EditableInput label="g" modelValue={colors.rgba?.g} onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-sketch-field--single">
            <EditableInput label="b" modelValue={colors.rgba?.b} onChange={inputChange}></EditableInput>
          </div>
          {!disableAlpha && <div class="vc-sketch-field--single" >
            <EditableInput label="a" modelValue={colors.a} arrow-offset={0.01} max={1} onChange={inputChange}></EditableInput>
          </div>}
        </div>}

        <div class="vc-sketch-presets" role="group" aria-label="A color preset, pick one to set as current color">
          {
            presetColors.map(c => <Fragment>
              {
                !isTransparent(c)
                  ? <div
                    class="vc-sketch-presets-color"
                    aria-label={`Color:${c}`}
                    key={c}
                    style={{ background: c }}
                    onClick={() => handlePreset(c)}>
                  </div>
                  : <div
                    key={c}
                    aria-label={`Color:${c}`}
                    class="vc-sketch-presets-color"
                    onClick={() => handlePreset(c)}>
                    <Checkboard />
                  </div>
              }
            </Fragment>)
          }
        </div>

      </div >
    )
  },
})
