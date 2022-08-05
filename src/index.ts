import { makeInstaller } from './helpers/install'
import components from './components'
import version from './version'
const VueColor = makeInstaller([...components])

const install = VueColor.install

export * from './types'

export {
  version,
  components,
  install,
  VueColor,
}
