import type { Plugin } from 'vue-demi'
import { Sketch } from './sketch'
import { Chrome } from './chrome'
import { Photoshop } from './photoshop'
import { Material } from './material'
import { Slider } from './slider'

export {
  Sketch,
  Chrome,
  Photoshop,
  Material,
  Slider,
}

export default [
  Sketch,
  Chrome,
  Photoshop,
  Material,
  Slider,
] as Plugin[]
