import { withInstall } from '../../helpers/install'
import { Photoshop as PhotoshopComponent } from './photoshop'
export type { PhotoshopProps } from './photoshop.types'
export const Photoshop = withInstall(PhotoshopComponent)
export default Photoshop
