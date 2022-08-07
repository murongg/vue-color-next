import { writeFileSync } from 'fs'
import path from 'path'

export function generateVersion() {
  const basePath = path.join(__dirname, '../src/version.ts')
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const version = require('../package.json').version
  writeFileSync(basePath, `export default '${version}'`)
}
