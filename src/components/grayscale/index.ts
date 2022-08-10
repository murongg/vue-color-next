import { withInstall } from '../../helpers/install'
import { Grayscale as GrayscaleComponent } from './grayscale'
export type { GrayscaleProps } from './grayscale.types'
export const Grayscale = withInstall(GrayscaleComponent)
export default Grayscale
