import { computed, defineComponent, ref, watch } from 'vue-demi'
import type { ColorObject } from '../../types'
import { mouseChange, throttleHandler } from '../../helpers/common'

export const Hue = defineComponent({
  name: 'Hue',
  props: {
    colors: Object,
    direction: {
      type: String,
      // [horizontal | vertical]
      default: 'horizontal',
      validate: (val: string) => ['horizontal', 'vertical'].includes(val),
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const colors = props.colors as ColorObject
    const oldHue = ref(0)
    const pullDirection = ref('')

    watch(colors, () => {
      const h = colors.hsla?.h || 0
      if (h !== 0 && h - oldHue.value > 0)
        pullDirection.value = 'right'
      if (h !== 0 && h - oldHue.value < 0)
        pullDirection.value = 'left'
      oldHue.value = h
    })

    const directionClass = computed(() => {
      return {
        'vc-hue--horizontal': props.direction === 'horizontal',
        'vc-hue--vertical': props.direction === 'vertical',
      }
    })
    const pointerTop = computed(() => {
      if (props.direction === 'vertical') {
        if (colors.hsla?.h === 0 && pullDirection.value === 'right')
          return 0
        return `${-(((colors.hsla?.h || 0) * 100) / 360) + 100}%`
      }
      else {
        return '0'
      }
    })

    const pointerLeft = computed(() => {
      if (props.direction === 'vertical') {
        return '0'
      }
      else {
        if (colors.hsla?.h === 0 && pullDirection.value === 'right')
          return '100%'
        return `${((colors.hsla?.h || 0) * 100) / 360}%`
      }
    })

    const onChange = (...param: any) => {
      emit('change', ...param)
    }

    const handleChange = (e: MouseEvent | TouchEvent, skip = false) => {
      const changeResult = mouseChange(e, skip, container)
      if (!changeResult)
        return

      const { containerWidth, containerHeight, pageX, pageY, xOffset, yOffset } = changeResult
      const left = pageX - xOffset
      const top = pageY - yOffset
      let h
      let percent

      if (props.direction === 'vertical') {
        if (top < 0) {
          h = 360
        }
        else if (top > containerHeight) {
          h = 0
        }
        else {
          percent = -(top * 100 / containerHeight) + 100
          h = (360 * percent / 100)
        }

        if (colors.hsla?.h !== h) {
          throttleHandler(onChange, {
            hsla: {
              h,
              s: colors.hsla?.s,
              l: colors.hsla?.l,
              a: colors.hsla?.a,
            },
            source: 'hsla',
          }, oldHue.value)
        }
      }
      else {
        if (left < 0) {
          h = 0
        }
        else if (left > containerWidth) {
          h = 360
        }
        else {
          percent = left * 100 / containerWidth
          h = (360 * percent / 100)
        }

        if (colors.hsla?.h !== h) {
          throttleHandler(onChange, {
            hsla: {
              h,
              s: colors.hsla?.s,
              l: colors.hsla?.l,
              a: colors.hsla?.a,
            },
            source: 'hsla',
          }, oldHue.value)
        }
      }
    }

    const unbindEventListeners = () => {
      window.removeEventListener('mousemove', handleChange)
    }
    const handleMouseUp = () => {
      unbindEventListeners()
      window.removeEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDown = (e: MouseEvent) => {
      handleChange(e, true)
      window.addEventListener('mousemove', handleChange)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return {
      container,
      directionClass,
      pointerTop,
      pointerLeft,
      handleMouseDown,
      handleChange,
    }
  },
  render() {
    const { directionClass, colors, handleMouseDown, handleChange, pointerTop, pointerLeft } = this
    return (
      <div class={['vc-hue', directionClass]}>
        <div class="vc-hue-container"
          role="slider"
          aria-valuenow={colors?.hsla?.h}
          aria-valuemin="0"
          aria-valuemax="360"
          ref="container"
          onMousedown={handleMouseDown}
          onTouchmove={handleChange}
          onTouchstart={handleChange}>
          <div class="vc-hue-pointer" style={{ top: pointerTop, left: pointerLeft }} role="presentation">
            <div class="vc-hue-picker"></div>
          </div>
        </div>
      </div>
    )
  },
})
