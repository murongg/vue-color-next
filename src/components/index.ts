import type { Plugin } from 'vue-demi'
import { Sketch } from './sketch'
import { Chrome } from './chrome'
import { Photoshop } from './photoshop'
export {
  Sketch,
  Chrome,
  Photoshop,
}

export default [
  Sketch,
  Chrome,
  Photoshop,
] as Plugin[]
