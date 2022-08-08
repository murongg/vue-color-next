import { execSync } from 'child_process'
import { writeFileSync } from 'fs'
import path from 'path'
import { readJSONSync } from 'fs-extra'

const { version: oldVersion } = readJSONSync('package.json')

execSync('npx bumpp --no-commit --no-tag --no-push', { stdio: 'inherit' })

const { version } = readJSONSync('package.json')

if (oldVersion === version) {
  console.log('canceled')
  process.exit()
}

const basePath = path.join(__dirname, '../src/version.ts')
try {
  writeFileSync(basePath, `export default '${version}'
`)
  execSync('npm run lint:fix', { stdio: 'inherit' })
  execSync('git add .', { stdio: 'inherit' })
} catch (error) {
  console.error(error)
}
