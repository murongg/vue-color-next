import { throttle } from 'throttle-debounce'
import clamp from 'clamp'
import { computed, defineComponent, ref } from 'vue-demi'
import { mouseChange } from '../../helpers/common'
import type { ColorObject } from '../../types'

const throttleHandler = throttle(20, (fn: Function, data: any) => {
  fn(data)
}, { noLeading: true, noTrailing: false })

export const Saturation = defineComponent({
  name: 'Saturation',
  props: {
    colors: Object,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const colors = props.colors as ColorObject

    const bgColor = computed(() => `hsl(${colors.hsv?.h}, 100%, 50%)`)
    const pointerTop = computed(() => `${(-((colors?.hsv?.v || 0) * 100) + 1) + 100}%`)
    const pointerLeft = computed(() => `${(colors?.hsv?.s || 0) * 100}%`)

    const onChange = (param: any) => {
      emit('change', param)
    }

    const handleChange = (e: MouseEvent | TouchEvent, skip = false) => {
      const changeResult = mouseChange(e, skip, container)
      if (!changeResult)
        return

      const { containerWidth, containerHeight, pageX, pageY, xOffset, yOffset } = changeResult
      const left = clamp(pageX - xOffset, 0, containerWidth)
      const top = clamp(pageY - yOffset, 0, containerHeight)
      const saturation = left / containerWidth
      const bright = clamp(-(top / containerHeight) + 1, 0, 1)
      throttleHandler(onChange, {
        hsv: {
          h: colors.hsv?.h,
          s: saturation,
          v: bright,
        },
        a: colors.hsv?.a,
        source: 'hsva',
      })
    }

    const unbindEventListeners = () => {
      window.removeEventListener('mousemove', handleChange)
      window.removeEventListener('mouseup', handleChange)
    }
    const handleMouseUp = () => {
      unbindEventListeners()
      window.removeEventListener('mouseup', handleMouseUp)
    }

    const handleMouseDown = () => {
      window.addEventListener('mousemove', handleChange)
      window.addEventListener('mouseup', handleChange)
      window.addEventListener('mouseup', handleMouseUp)
    }

    return {
      container,
      bgColor,
      pointerTop,
      pointerLeft,
      handleMouseDown,
      handleChange,
    }
  },
  render() {
    const { bgColor, handleMouseDown, handleChange, pointerTop, pointerLeft } = this
    return (
      <div class="vc-saturation"
        style={{ background: bgColor }}
        ref="container"
        onMousedown={handleMouseDown}
        onTouchmove={handleChange}
        onTouchstart={handleChange}>
        <div class="vc-saturation--white"></div>
        <div class="vc-saturation--black"></div>
        <div class="vc-saturation-pointer" style={{ top: pointerTop, left: pointerLeft }}>
          <div class="vc-saturation-circle"></div>
        </div>
      </div>
    )
  },
})
