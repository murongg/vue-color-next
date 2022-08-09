import type { Plugin } from 'vue-demi'
import { Sketch } from './sketch'
import { Chrome } from './chrome'
import { Photoshop } from './photoshop'
import { Material } from './material'

export {
  Sketch,
  Chrome,
  Photoshop,
  Material,
}

export default [
  Sketch,
  Chrome,
  Photoshop,
  Material,
] as Plugin[]
