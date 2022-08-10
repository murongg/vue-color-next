import { withInstall } from '../../helpers/install'
import { Twitter as TwitterComponent } from './twitter'
export type { TwitterProps } from './twitter.types'
export const Twitter = withInstall(TwitterComponent)
export default Twitter
