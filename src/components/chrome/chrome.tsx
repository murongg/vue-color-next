import { computed, defineComponent, ref } from 'vue-demi'
import { useColor } from '../../composables/color'
import { isValidHex } from '../../helpers/color'
import { Alpha } from '../common/alpha'
import { Checkboard } from '../common/checkboard'
import { EditableInput } from '../common/editableInput'
import { Hue } from '../common/hue'
import { Saturation } from '../common/saturation'
import { chormeProps } from './chorme.types'

export const Chrome = defineComponent({
  name: 'Chrome',
  props: chormeProps,
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const { colors, setColor, watchColor } = useColor(props)

    watchColor((value) => {
      emit('update:modelValue', value)
    })

    const hsl = computed(() => {
      if (colors.hsl) {
        const { h, s, l } = colors.hsl
        return {
          h: h.toFixed(),
          s: `${(s * 100).toFixed()}%`,
          l: `${(l * 100).toFixed()}%`,
        }
      }
    })

    const activeColor = computed(() => {
      const rgba = colors.rgba
      if (rgba)
        return `rgba(${[rgba.r, rgba.g, rgba.b, rgba.a].join(',')})`
    })

    const hasAlpha = computed(() => (colors?.a || 0) < 1)

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
      else if (data.h || data.s || data.l) {
        const s = data.s ? (data.s.replace('%', '') / 100) : colors.hsl?.s
        const l = data.l ? (data.l.replace('%', '') / 100) : colors.hsl?.l

        setColor({
          hsl: {
            h: data.h || colors.hsl?.h,
            s: s || 0,
            l: l || 0,
          },
          source: 'hsl',
        })
      }
    }

    const fieldsIndex = ref(0)

    const toggleViews = () => {
      if (fieldsIndex.value >= 2) {
        fieldsIndex.value = 0
        return
      }
      fieldsIndex.value++
    }

    const highlight = ref(false)

    const showHighlight = () => {
      highlight.value = true
    }

    const hideHighlight = () => {
      highlight.value = false
    }
    return {
      colors,
      setColor,
      hsl,
      activeColor,
      hasAlpha,
      inputChange,
      fieldsIndex,
      toggleViews,
      highlight,
      showHighlight,
      hideHighlight,
    }
  },
  render() {
    const { colors, setColor, hsl, disableAlpha, disableFields, activeColor, hasAlpha, inputChange, fieldsIndex, toggleViews, highlight, showHighlight, hideHighlight } = this

    const alphaComponent = !disableAlpha && <div class="vc-chrome-field" >
      <EditableInput label="a" modelValue={colors.a} arrow-offset={0.01} max={1} onChange={inputChange}></EditableInput>
    </div>

    const field = (value: any, label: string) => <div class="vc-chrome-field">
      <EditableInput label={label} modelValue={value} onChange={inputChange}></EditableInput>
    </div>

    return (
      <div role="application" aria-label="Chrome color picker" class={['vc-chrome', disableAlpha ? 'vc-chrome__disable-alpha' : '']}>
        <div class="vc-chrome-saturation-wrap">
          <Saturation colors={colors} onChange={setColor} />
        </div>
        <div class="vc-chrome-body">
          <div class="vc-chrome-controls">
            <div class="vc-chrome-color-wrap">
              <div aria-label={`current color is ${colors.hex}`} class="vc-chrome-active-color" style={{ background: activeColor }}></div>
              {
                !disableAlpha && <Checkboard />
              }
            </div>

            <div class="vc-chrome-sliders">
              <div class="vc-chrome-hue-wrap">
                <Hue colors={colors} onChange={setColor} />
              </div>
              {!disableAlpha && <div class="vc-chrome-alpha-wrap">
                <Alpha colors={colors} onChange={setColor} />
              </div>}
            </div>
          </div >
          {!disableFields && <div class="vc-chrome-fields-wrap">
            <div class="vc-chrome-fields" v-show={fieldsIndex === 0}>
              {/* hex */}
              <div class="vc-chrome-field">
                <EditableInput label="hex" modelValue={hasAlpha ? colors.hex8 : colors.hex} onChange={inputChange}></EditableInput>
              </div>
            </div>
            <div class="vc-chrome-fields" v-show={fieldsIndex === 1}>
              {/* rgba */}
              {
                [{
                  value: colors.rgba?.r,
                  label: 'r',
                }, {
                  value: colors.rgba?.g,
                  label: 'g',
                }, {
                  value: colors.rgba?.b,
                  label: 'b',
                }].map(item => field(item.value, item.label))
              }
              {alphaComponent}
            </div>

            <div class="vc-chrome-fields" v-show={fieldsIndex === 2}>
              {/* hsla */}
              {
                [{
                  value: hsl?.h,
                  label: 'h',
                }, {
                  value: hsl?.s,
                  label: 's',
                }, {
                  value: hsl?.l,
                  label: 'l',
                }].map(item => field(item.value, item.label))
              }
              {alphaComponent}
            </div>

            {/* btn */}
            <div class="vc-chrome-toggle-btn" role="button" aria-label="Change another color definition" onClick={toggleViews}>
              <div class="vc-chrome-toggle-icon">
                <svg style="width:24px; height:24px" viewBox="0 0 24 24"
                  onMouseover={showHighlight}
                  onMouseenter={showHighlight}
                  onMouseout={hideHighlight}>
                  <path fill="#333" d="M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z" />
                </svg>
              </div>
              <div class="vc-chrome-toggle-icon-highlight" v-show={highlight}></div>
            </div>
            {/* btn */}
          </div>}
        </div >
      </div >
    )
  },
})
