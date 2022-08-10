import type { Plugin } from 'vue-demi'
import { Sketch } from './sketch'
import { Chrome } from './chrome'
import { Photoshop } from './photoshop'
import { Material } from './material'
import { Slider } from './slider'
import { Compact } from './compact'
import { Grayscale } from './grayscale'
import { Swatches } from './swatches'
import { Twitter } from './twitter'

export {
  Sketch,
  Chrome,
  Photoshop,
  Material,
  Slider,
  Compact,
  Grayscale,
  Swatches,
  Twitter,
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
  Twitter,
] as Plugin[]
