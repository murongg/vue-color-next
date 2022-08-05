import { Fragment, computed, defineComponent } from 'vue-demi'
import { useColor } from '../../composables/color'
import { Saturation } from '../common/saturation'
import { Alpha } from '../common/alpha'
import { Checkboard } from '../common/checkboard'
import { EditableInput } from '../common/editableInput'
import { Hue } from '../common/hue'
import { isTransparent, isValidHex } from '../../helpers/color'
import { sketchProps } from './sketch.types'
export const Sketch = defineComponent({
  name: 'Sketch',
  props: sketchProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor } = useColor()
    setColor(modelValue.value)

    const hex = computed(() => {
      const result = colors.a < 1 ? colors.hex8 : colors.hex
      return result.replace('#', '')
    })

    const activeColor = computed(() => {
      const rgba = colors.rgba
      return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`
    })

    watch(colors, () => {
      emit('update:modelValue', colors)
    })

    const inputChange = (data: any) => {
      if (!data)
        return

      if (data.hex) {
        isValidHex(data.hex) && setColor({
          color: data.hex,
          source: 'hex',
        })
      }
      else if (data.r || data.g || data.b || data.a) {
        setColor({
          color: {
            r: data.r || colors.rgba.r,
            g: data.g || colors.rgba.g,
            b: data.b || colors.rgba.b,
            a: data.a || colors.rgba.a,
          },
          source: 'rgba',
        })
      }
    }

    const handlePreset = (c: string) => {
      setColor({
        color: c,
        source: 'hex',
      })
    }

    return {
      colors,
      inputChange,
      activeColor,
      hex,
      handlePreset,
    }
  },
  render() {
    const { colors, disableAlpha, disableFields, activeColor, inputChange, handlePreset, hex, presetColors } = this
    return (
      <div role="application" aria-label="Sketch color picker" class={['vc-sketch', disableAlpha ? 'vc-sketch__disable-alpha' : '']}>
        <div class="vc-sketch-saturation-wrap">
          <Saturation />
        </div>
        <div class="vc-sketch-controls">
          <div class="vc-sketch-sliders">
            <div class="vc-sketch-hue-wrap">
              <Hue />
            </div>
            {
              !disableAlpha && <div class="vc-sketch-alpha-wrap">
                <Alpha />
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
            <EditableInput label="r" modelValue={colors.rgba.r} onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-sketch-field--single">
            <EditableInput label="g" modelValue={colors.rgba.g} onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-sketch-field--single">
            <EditableInput label="b" modelValue={colors.rgba.b} onChange={inputChange}></EditableInput>
          </div>
          {!disableAlpha && <div class="vc-sketch-field--single" >
            <EditableInput label="a" modelValue={colors.a} rrow-offset={0.01} max={1} onChange={inputChange}></EditableInput>
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
                    key="c"
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
