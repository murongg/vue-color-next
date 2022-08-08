import { computed, defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { isValidHex } from '../../helpers/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import { Saturation } from '../common/saturation'
import { Hue } from '../common/hue'
import { EditableInput } from '../common/editableInput'
import { photoshopProps } from './photoshop.types'
import type { PhotoshopProps } from './photoshop.types'

export const Photoshop = defineComponent({
  name: 'Photoshop',
  props: photoshopProps,
  emits: [...emits, 'ok', 'cancel', 'reset'],
  setup(props: PhotoshopProps, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor, watchColor } = useColor(modelValue)
    useEmit(emit, colors)
    watchColor((value) => {
      useEmit(emit, value)
    })

    const currentColor = ref(colors.hex)
    const hsv = computed(() => {
      const hsv = colors.hsv
      return {
        h: hsv?.h.toFixed(),
        s: ((hsv?.s || 0) * 100).toFixed(),
        v: ((hsv?.v || 0) * 100).toFixed(),
      }
    })

    const hex = computed(() => {
      return colors.hex?.replace('#', '')
    })

    const inputChange = (data: any) => {
      if (!data)
        return

      if (data['#']) {
        isValidHex(data['#']) && setColor({
          hex: data['#'],
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
      else if (data.h || data.s || data.v) {
        setColor({
          hsv: {
            h: data.h || colors.hsv?.h,
            s: (data.s / 100) || colors.hsv?.s || 0,
            v: (data.v / 100) || colors.hsv?.v || 0,
          },
          source: 'hsv',
        })
      }
    }

    const clickCurrentColor = () => {
      setColor({
        hex: currentColor.value,
        source: 'hex',
      })
    }
    const handleAccept = () => {
      emit('ok', colors)
    }
    const handleCancel = () => {
      emit('cancel')
    }
    const handleReset = () => {
      setColor({
        hex: currentColor.value,
      })
      emit('reset', colors)
    }

    return {
      colors,
      setColor,
      currentColor,
      hsv,
      hex,
      inputChange,
      clickCurrentColor,
      handleAccept,
      handleCancel,
      handleReset,
    }
  },
  render() {
    const { disableFields, head, colors, setColor, newLabel, currentLabel, currentColor, clickCurrentColor, handleAccept, handleCancel, acceptLabel, cancelLabel, hsv, inputChange, hex, handleReset, resetLabel, hasResetButton } = this
    return (
      <div role="application" aria-label="PhotoShop color picker" class={['vc-photoshop', disableFields ? 'vc-photoshop__disable-fields' : '']}>
        <div role="heading" class="vc-ps-head">{head}</div>
        <div class="vc-ps-body">
          <div class="vc-ps-saturation-wrap">
            <Saturation colors={colors} onChange={setColor} />
          </div>
          <div class="vc-ps-hue-wrap">
            <Hue colors={colors} onChange={setColor} direction="vertical">
              <div class="vc-ps-hue-pointer">
                <i class="vc-ps-hue-pointer--left"></i>
                <i class="vc-ps-hue-pointer--right"></i>
              </div>
            </Hue>
          </div>
          <div class={['vc-ps-controls', disableFields ? 'vc-ps-controls__disable-fields' : '']}>
            <div class="vc-ps-previews">
              <div class="vc-ps-previews__label">{newLabel}</div>
              <div class="vc-ps-previews__swatches">
                <div class="vc-ps-previews__pr-color" aria-label={`New color is ${colors.hex}`} style={{ background: colors.hex }}></div>
                <div class="vc-ps-previews__pr-color" aria-label={`Current color is ${currentColor}`} style={{ background: currentColor }} onClick={clickCurrentColor} ></div>
              </div>
              <div class="vc-ps-previews__label">{currentLabel}</div>
            </div>
            {
              !disableFields
              && <div class="vc-ps-actions" >
                <div class="vc-ps-ac-btn" role="button" aria-label="acceptLabel" onClick={handleAccept} >{acceptLabel}</div>
                <div class="vc-ps-ac-btn" role="button" aria-label="cancelLabel" onClick={handleCancel} >{cancelLabel}</div>
                <div class="vc-ps-fields">
                  {/* hsla */}
                  <EditableInput label="h" modelValue={hsv.h} onChange={inputChange}></EditableInput>
                  <EditableInput label="s" desc="%" modelValue={hsv.s} max={100} onChange={inputChange}></EditableInput>
                  <EditableInput label="v" desc="%" modelValue={hsv.v} max={100} onChange={inputChange}></EditableInput>
                  <div class="vc-ps-fields__divider"></div>
                  {/* rgba */}
                  <EditableInput label="r" modelValue={colors.rgba?.r} onChange={inputChange}></EditableInput>
                  <EditableInput label="g" modelValue={colors.rgba?.g} onChange={inputChange}></EditableInput>
                  <EditableInput label="b" modelValue={colors.rgba?.b} onChange={inputChange}></EditableInput>
                  <div class="vc-ps-fields__divider"></div>
                  {/* hex */}
                  <EditableInput label="#" class="vc-ps-fields__hex" modelValue={hex} onChange={inputChange}></EditableInput>
                </div>
                {
                  hasResetButton && <div class="vc-ps-ac-btn" aria-label="reset" onClick={handleReset}>{resetLabel}</div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    )
  },
})
