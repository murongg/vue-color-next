import path from 'path'
import type { Options as ESBuildOptions } from 'rollup-plugin-esbuild'
import esbuild from 'rollup-plugin-esbuild'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { OutputOptions, RollupOptions } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
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
  },
  {
    file: 'dist/index.mjs',
    format: 'es',
  },
  {
    file: 'dist/index.iife.js',
    format: 'iife',
    name: globalName,
    extend: true,
    globals,
  },
  {
    file: 'dist/index.iife.min.js',
    format: 'iife',
    name: globalName,
    extend: true,
    globals,
    plugins: [
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
    extend: true,
    sourcemap: true,
    plugins: [
      (nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }) as any),
    ],
  },
  {
    file: 'dist/index.umd.min.js',
    format: 'umd',
    exports: 'named',
    name: globalName,
    globals,
    extend: true,
    sourcemap: true,
    plugins: [
      (nodeResolve({
        extensions: ['.mjs', '.js', '.json', '.ts'],
      }) as any),
      esbuildMinifer({
        minify: true,
      }),
    ],
  },
]

const config: RollupOptions = {
  input,
  output,
  plugins,
  external: externals,
}

const configs = [config, {
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

export default configs
