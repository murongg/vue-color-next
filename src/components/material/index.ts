import { withInstall } from '../../helpers/install'
import { Material as MaterialComponent } from './material'
export type { MaterialProps } from './material.types'
export const Material = withInstall(MaterialComponent)
export default Material
