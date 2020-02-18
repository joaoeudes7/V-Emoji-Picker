import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import commonjs from 'rollup-plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import resolve from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete'
import css from 'rollup-plugin-css-porter';
import sass from 'rollup-plugin-sass';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

const defaultName = 'VEmojiPicker'
const defaultNameFiles = 'v-emoji-picker'

export default {
  input: 'src/index.ts', // our source file
  output: [

    {
      // Keep the bundle as an ES module file, suitable for other bundlers
      // and inclusion as a <script type=module> tag in modern browsers
      name: defaultName,
      file: `lib/${defaultNameFiles}.esm.js`,
      format: 'esm', // the preferred format
    },
    {
      // Universal Module Definition, works as amd, cjs and iife all in one
      name: defaultName,
      file: `lib/${defaultNameFiles}.umd.js`,
      format: 'umd',
      globals: {
        'vue-property-decorator': 'vuePropertyDecorator'
      }
    },
    {
      // A self-executing function, suitable for inclusion as a <script> tag.
      // (If you want to create a bundle for your application, you probably want to use this.)
      name: defaultName,
      file: `lib/${defaultNameFiles}.min.js`,
      format: 'iife',
      globals: {
        'vue-property-decorator': 'vuePropertyDecorator'
      }
    },
    // {
    //   // CommonJS, suitable for Node and other bundlers
    //   name: defaultName,
    //   file: `lib/${defaultNameFiles}.cjs.js`,
    //   format: 'cjs',
    // },
  ],

  external: [
    ...Object.keys(pkg.dependencies || {})
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      module: 'esnext',
      tsconfig: "tsconfig.json",
      tsconfigOverride: { exclude: ["node_modules", "src/main.ts", "tests"] },
    }),
    commonjs(),

    // [Rollup Plugin Vue](https://rollup-plugin-vue.vuejs.org/)
    vue({
      css: true, // Dynamically inject css as a <style> tag
      compileTemplate: true, // Explicitly convert template to render function
    }),
    sass(),
    css(),
    resolve(),
    terser({
      include: [/^.+\.min\.js$/, "*esm*"],
      exclude: ["some*"]
    }),
    del({
      targets: 'lib/main.d.ts',
      hook: 'generateBundle'
    }),
    filesize({
      showBrotliSize: true
    })
  ]
};
