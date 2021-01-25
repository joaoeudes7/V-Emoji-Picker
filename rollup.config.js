import resolve from '@rollup/plugin-node-resolve';
import css from 'rollup-plugin-css-porter';
import filesize from 'rollup-plugin-filesize';
import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import pkg from './package.json';

// Default configs
const name = 'VEmojiPicker';
const exports = 'named';
const sourcemap = false;
const globals = {
  'vue-property-decorator': 'vuePropertyDecorator',
  'vue-class-component': 'vueClassComponent'
};

export default {
  input: 'src/index.ts', // our source file
  inlineDynamicImports: true,
  output: [
    {
      // Keep the bundle as an ES module file, suitable for other bundlers
      // and inclusion as a <script type=module> tag in modern browsers
      name,
      file: pkg.module,
      format: 'esm', // the preferred format
      compact: true,
      exports,
      sourcemap
    },
    {
      // A self-executing function, suitable for inclusion as a <script> tag.
      // (If you want to create a bundle for your application, you probably want to use this.)
      name,
      file: pkg.unpkg,
      format: 'iife',
      compact: true,
      exports,
      sourcemap,
      globals
    },
    {
      // CommonJS, suitable for Node and other bundlers
      name,
      file: pkg.main,
      format: 'cjs',
      compact: true,
      exports,
      sourcemap,
      globals
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies)
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      module: 'esnext',
      check: false,
      tsconfig: "tsconfig.json",
      rollupCommonJSResolveHack: true,
      tsconfigOverride: { exclude: ["node_modules", "src/main.ts", "tests"] }
    }),
    sass(),
    css(),
    vue({
      css: true,
      template: {
        isProduction: true
      }
    }),
    resolve({
      extensions: ['.js', '.ts']
    }),
    filesize({
      showBrotliSize: true
    }),
  ]
};
