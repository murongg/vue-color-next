import { defineComponent, toRefs } from 'vue-demi'
import { useColor } from '../../composables/color'
import { EditableInput } from '../common/editableInput'
import { isValidHex } from '../../helpers/color'
import { emits } from '../common.emits'
import { useEmit } from '../../composables/emits'
import type { MaterialProps } from './material.types'
import { materialProps } from './material.types'

export const Material = defineComponent({
  name: 'Material',
  props: materialProps,
  emits: [...emits],
  setup(props: MaterialProps, { emit }) {
    const { modelValue } = toRefs(props)
    const { colors, setColor, watchColor } = useColor(modelValue)
    useEmit(emit, colors)
    watchColor((value) => {
      useEmit(emit, value)
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
      else if (data.r || data.g || data.b) {
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

    return {
      colors,
      inputChange,
    }
  },
  render() {
    const { colors, inputChange } = this
    return (
      <div role="application" aria-label="Material color picker" class="vc-material">
        <EditableInput class="vc-material-hex" label="hex" modelValue={colors.hex}
          style={{ borderColor: colors.hex }} onChange={inputChange}></EditableInput>

        <div class="vc-material-split">
          <div class="vc-material-third">
            <EditableInput label="r" modelValue={colors.rgba?.r}
              onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-material-third">
            <EditableInput label="g" modelValue={colors.rgba?.g}
              onChange={inputChange}></EditableInput>
          </div>
          <div class="vc-material-third">
            <EditableInput label="b" modelValue={colors.rgba?.b}
              onChange={inputChange}></EditableInput>
          </div>
        </div>
      </div >
    )
  },
})
