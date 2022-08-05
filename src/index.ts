import { makeInstaller } from './helpers/install'
import components from './components'

const VueColor = makeInstaller([...components])

const install = VueColor.install

export * from './types'

export {
  components,
  install,
  VueColor,
}
