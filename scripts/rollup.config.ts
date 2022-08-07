import path from 'path'
import { readFileSync } from 'fs'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { OutputOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'

const input = path.join(__dirname, '../src/index.ts')

export const target = 'es2018'
const globalName = 'VueColor'
const externals = ['vue']
const globals = {
  vue: 'Vue',
}

const esbuildMinifer = (options: ESBuildOptions): any => {
  const { renderChunk } = esbuild(options)

  return {
    name: 'esbuild-minifer',
    renderChunk,
  }
}

const VUE_DEMI_IIFE = readFileSync(require.resolve('vue-demi/lib/index.iife.js'), 'utf-8')
const injectVueDemi = {
  name: 'inject-vue-demi',
  renderChunk(code: string) {
    return `${VUE_DEMI_IIFE};\n;${code}`
  },
}

const plugins: any = [
  vue({
    isProduction: true,
  }),
  vueJsx(),

  esbuild({
    exclude: [],
    sourceMap: true,
    target,
    loaders: {
      '.vue': 'ts',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    treeShaking: true,
    legalComments: 'eof',
  }),
]

const output: OutputOptions[] = [
  {
    file: 'dist/index.cjs',
    format: 'cjs',
    plugins,
  },
  {
    file: 'dist/index.mjs',
    format: 'es',
    plugins,
  },
  {
    file: 'dist/index.iife.js',
    format: 'iife',
    name: globalName,
    globals,
    plugins: [
      injectVueDemi,
      ...plugins,
    ],
  },
  {
    file: 'dist/index.iife.min.js',
    format: 'iife',
    name: globalName,
    globals,
    plugins: [
      injectVueDemi,
      ...plugins,
      esbuildMinifer({
        minify: true,
      }),
    ],
  },
  {
    format: 'umd',
    file: 'dist/index.umd.js',
    exports: 'named',
    name: globalName,
    globals,
    sourcemap: true,
    plugins: [
      commonjs(),
      ...plugins,
      (nodeResolve() as any),
    ],
  },
  {
    file: 'dist/index.umd.min.js',
    format: 'umd',
    exports: 'named',
    name: globalName,
    globals,
    sourcemap: true,
    plugins: [
      commonjs(),
      ...plugins,
      (nodeResolve() as any),
      esbuildMinifer({
        minify: true,
      }),
    ],
  },
]

const configs: any = [{
  input,
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [
    ...plugins,
    (dts() as any),
  ],
}]

output.forEach((item) => {
  configs.push({
    input,
    output: item,
    plugins: item.plugins,
    external: externals,
  })
})

export default configs
