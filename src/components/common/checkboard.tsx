import type { PropType } from 'vue-demi'
import { computed, defineComponent } from 'vue-demi'

const _checkboardCache: Record<string, any> = {}

/**
 * get base 64 data by canvas
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */

function renderCheckboard(c1: CanvasFillStrokeStyles['fillStyle'], c2: CanvasFillStrokeStyles['fillStyle'], size: number) {
  // Dont Render On Server
  if (typeof document === 'undefined')
    return null

  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size * 2
  const ctx = canvas.getContext('2d')
  // If no context can be found, return early.
  if (!ctx)
    return null

  ctx.fillStyle = c1
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = c2
  ctx.fillRect(0, 0, size, size)
  ctx.translate(size, size)
  ctx.fillRect(0, 0, size, size)
  return canvas.toDataURL()
}

/**
 * get checkboard base data and cache
 *
 * @param {String} c1 hex color
 * @param {String} c2 hex color
 * @param {Number} size
 */

function getCheckboard(c1: CanvasFillStrokeStyles['fillStyle'], c2: CanvasFillStrokeStyles['fillStyle'], size: number) {
  const key = `${c1},${c2},${size}`

  if (_checkboardCache[key]) {
    return _checkboardCache[key]
  }
  else {
    const checkboard = renderCheckboard(c1, c2, size)
    _checkboardCache[key] = checkboard
    return checkboard
  }
}

export const Checkboard = defineComponent({
  name: 'Checkboard',
  props: {
    size: {
      type: [Number, String] as PropType<number | string>,
      default: 8,
    },
    white: {
      type: String,
      default: '#fff',
    },
    grey: {
      type: String,
      default: '#e6e6e6',
    },
  },
  setup(props) {
    const bgStyle = computed(() => {
      return {
        'background-image': `url(${getCheckboard(props.white, props.grey, Number(props.size))})`,
      }
    })
    return {
      bgStyle,
    }
  },
  render() {
    return <div class="vc-checkerboard" style={this.bgStyle}></div>
  },
})
