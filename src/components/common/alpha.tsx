import { computed, defineComponent, ref } from 'vue-demi'
import type { ColorObject } from '../../../dist'
import { mouseChange } from '../../helpers/common'
import { Checkboard } from './checkboard'

export const Alpha = defineComponent({
  name: 'Alpha',
  props: {
    colors: Object,
  },
  emits: ['change'],
  setup(props, { emit }) {
    const container = ref<HTMLElement | null>(null)
    const colors = props.colors as ColorObject
    const gradientColor = computed(() => {
      const rgba = colors.rgba
      if (rgba) {
        const rgbStr = [rgba.r, rgba.g, rgba.b].join(',')
        return `linear-gradient(to right, rgba(${rgbStr}, 0) 0%, rgba(${rgbStr}, 1) 100%)`
      }
    })

    const handleChange = (e: MouseEvent | TouchEvent, skip = false) => {
      const changeResult = mouseChange(e, skip, container)
      if (!changeResult)
        return
      const { containerWidth, pageX, xOffset } = changeResult
      const left = pageX - xOffset

      let a
      if (left < 0)
        a = 0
      else if (left > containerWidth)
        a = 1
      else
        a = Math.round(left * 100 / containerWidth) / 100
      if (colors.a !== a) {
        emit('change', {
          color: {
            h: colors.hsl.h,
            s: colors.hsl.s,
            l: colors.hsl.l,
            a,
          },
          source: 'rgba',
        })
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
      gradientColor,
      handleChange,
      handleMouseDown,
    }
  },
  render() {
    const { gradientColor, handleChange, handleMouseDown, colors } = this
    return (
      <div class="vc-alpha">
        <div class="vc-alpha-checkboard-wrap">
          <Checkboard></Checkboard>
        </div>
        <div class="vc-alpha-gradient" style={{ background: gradientColor }}></div>
        <div class="vc-alpha-container" ref="container"
          onMousedown={handleMouseDown}
          onTouchmove={handleChange}
          onTouchstart={handleChange}>
          <div class="vc-alpha-pointer" style={{ left: `${(colors?.a || 0) * 100}%` }}>
            <div class="vc-alpha-picker"></div>
          </div>
        </div>
      </div>
    )
  },
})
