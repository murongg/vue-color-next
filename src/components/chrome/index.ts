import { withInstall } from '../../helpers/install'
import { Chrome as ChromeComponent } from './chrome'
export type { ChromeProps } from './chorme.types'
export const Chrome = withInstall(ChromeComponent)
export default Chrome
