import type { Plugin } from 'vue-demi'
import { Sketch } from './sketch'
import { Chrome } from './chrome'

export {
  Sketch,
  Chrome,
}

export default [
  Sketch,
  Chrome,
] as Plugin[]
