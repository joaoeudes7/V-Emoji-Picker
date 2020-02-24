import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import css from 'rollup-plugin-css-porter';
import sass from 'rollup-plugin-sass';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

// Default configs
const name = 'VEmojiPicker'
const pkgName = 'v-emoji-picker'
const exports = 'named'
const sourcemap = false
const globals = {
  'vue-property-decorator': 'vuePropertyDecorator'
}

export default {
  input: 'src/index.ts', // our source file
  output: [
    {
      // Keep the bundle as an ES module file, suitable for other bundlers
      // and inclusion as a <script type=module> tag in modern browsers
      name,
      file: `lib/${pkgName}.esm.js`,
      format: 'esm', // the preferred format
      exports,
      sourcemap
    },
    {
      // Universal Module Definition, works as amd, cjs and iife all in one
      name,
      file: `lib/${pkgName}.umd.js`,
      format: 'umd',
      exports,
      sourcemap,
      globals
    },
    {
      // A self-executing function, suitable for inclusion as a <script> tag.
      // (If you want to create a bundle for your application, you probably want to use this.)
      name,
      file: `lib/${pkgName}.min.js`,
      format: 'iife',
      compact: true,
      exports,
      sourcemap,
      globals,
      plugins: [
        terser()
      ]
    },
    {
      // CommonJS, suitable for Node and other bundlers
      name,
      file: `lib/${pkgName}.cjs.js`,
      format: 'cjs',
      exports,
      sourcemap,
      globals
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      module: 'esnext',
      tsconfig: "tsconfig.json",
      rollupCommonJSResolveHack: true,
      tsconfigOverride: { exclude: ["node_modules", "src/main.ts", "tests"] },
    }),
    resolve({
      extensions: ['.js', '.ts']
    }),
    sass(),
    css(),
    vue({
      css: true
    }),
    filesize({
      showBrotliSize: true
    })
  ]
};
