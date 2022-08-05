import { withInstall } from '../../helpers/install'
import { Sketch as SketchComponent } from './sketch'
export type { SketchProps } from './sketch.types'
export const Sketch = withInstall(SketchComponent)
export default Sketch
