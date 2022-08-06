import path from 'path'
import { readFileSync, readdirSync } from 'fs'
import chalk from 'chalk'
import { dest, parallel, series, src } from 'gulp'
import cleanCSS from 'gulp-clean-css'
import consola from 'consola'
import through from 'through2'
import rename from 'gulp-rename'

const distFolder = path.resolve(__dirname, '../dist')
const files = readdirSync(path.resolve(__dirname, '../src/styles'), {}) as string[]

function getCommonCssContent() {
  const css = readFileSync(path.resolve(__dirname, '../src/styles/common.css'), 'utf-8')
  return css
}

function getAllCssContent() {
  let content = ''
  files.forEach((file) => {
    const css = readFileSync(path.join(__dirname, '../src/styles', file), 'utf-8')
    content += css
  })
  return content
}

function pushAllCss() {
  const stream = through.obj((file, enc, cb) => {
    if (file.isBuffer()) {
      file.contents = Buffer.from(`
        ${getAllCssContent()}
      `)
      cb(null, file)
    }
  })
  return stream
}

function pushCustomCss() {
  const stream = through.obj((file, enc, cb) => {
    if (file.isBuffer()) {
      file.contents = Buffer.from(`
        ${getCommonCssContent()}
        ${String(file.contents)}
      `)
      cb(null, file)
    }
  })
  return stream
}

function buildOne() {
  const paths = files.filter(file => !/common|index/.test(file)).map(p => path.resolve(__dirname, `../src/styles/${p}`))
  return src(paths)
    .pipe(pushCustomCss())
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000,
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`,
        )
      }),
    )
    .pipe(dest(path.join(distFolder, 'styles')))
}

function buildAll() {
  return src(path.join(__dirname, '../src/styles/index.css'))
    .pipe(pushAllCss())
    .pipe(
      cleanCSS({}, (details) => {
        consola.success(
          `${chalk.cyan(details.name)}: ${chalk.yellow(
            details.stats.originalSize / 1000,
          )} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`,
        )
      }),
    )
    .pipe(dest(path.join(distFolder)))
    .pipe(
      rename((path) => {
        path.basename = 'index.min'
      }),
    )
    .pipe(dest(path.join(distFolder)))
}

export const build = parallel(
  series(buildOne),
  series(buildAll),
)

export default build
