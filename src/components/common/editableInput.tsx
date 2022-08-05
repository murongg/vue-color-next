import { computed, defineComponent, ref } from 'vue'

export const EditableInput = defineComponent({
  name: 'EditableInput',
  props: {
    label: String,
    labelText: String,
    desc: String,
    modelValue: [String, Number],
    max: Number,
    min: Number,
    arrowOffset: {
      type: Number,
      default: 1,
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const input = ref<HTMLInputElement | null>(null)
    const val = computed<string | number>({
      get() {
        return props.modelValue || ''
      },
      set(v: string | number) {
        if (!(props.max === undefined) && +v > props.max) {
          if (input.value)
            input.value.value = props.max.toString()
        }
        else {
          return v
        }
      },
    })

    const labelId = computed(() => {
      return `input__label__${props.label}__${Math.random().toString().slice(2, 5)}`
    })
    const labelSpanText = computed(() => {
      return props.labelText || props.label
    })

    const handleChange = (newVal: string) => {
      const data: any = {}
      data[props.label || ''] = newVal
      if (data.hex === undefined && data['#'] === undefined)
        emit('change', data)
      else if (newVal.length > 5)
        emit('change', data)
    }

    const update = (e: any) => {
      handleChange(e.target?.value || '')
    }

    const handleKeyDown = (e: any) => {
      let value = val.value || ''
      const number = Number(val)

      if (number) {
        const amount = props.arrowOffset || 1

        // Up
        if (e.keyCode === 38) {
          value = number + amount
          handleChange(value.toString())
          e.preventDefault()
        }

        // Down
        if (e.keyCode === 40) {
          value = number - amount
          handleChange(value.toString())
          e.preventDefault()
        }
      }
    }
    return {
      input,
      handleKeyDown,
      update,
      labelSpanText,
      labelId,
      val,
    }
  },
  render() {
    const { handleKeyDown, labelSpanText, labelId, update, desc, val } = this
    return (
      <div class="vc-editable-input">
        <input
          aria-labelledby="labelId"
          class="vc-input__input"
          value={val}
          onKeydown={handleKeyDown}
          onInput={update}
          ref="input"
        />
        <span class="vc-input__label" id={labelId}>{{ labelSpanText }}</span>
        <span class="vc-input__desc">{{ desc }}</span>
      </div>
    )
  },
})
