import { withInstall } from '../../helpers/install'
import { Swatches as SwatchesComponent } from './swatches'
export type { SwatchesProps } from './swatches.types'
export const Swatches = withInstall(SwatchesComponent)
export default Swatches
