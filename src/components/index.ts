import type { Plugin } from 'vue-demi'
import { Sketch } from './sketch'
import { Chrome } from './chrome'
import { Photoshop } from './photoshop'
import { Material } from './material'
import { Slider } from './slider'
import { Compact } from './compact'
import { Grayscale } from './grayscale'
import { Swatches } from './swatches'

export {
  Sketch,
  Chrome,
  Photoshop,
  Material,
  Slider,
  Compact,
  Grayscale,
  Swatches,
}

export default [
  Sketch,
  Chrome,
  Photoshop,
  Material,
  Slider,
  Compact,
  Grayscale,
  Swatches,
] as Plugin[]
