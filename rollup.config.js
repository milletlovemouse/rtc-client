import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import esbuild from 'rollup-plugin-esbuild';
import dts from 'rollup-plugin-dts';
import json from '@rollup/plugin-json';

const config = defineConfig([
  {
    input: [`./src/core/index.ts`],
    output: [
      // {
      //   file: `./dist/index.cjs.js`,
      //   format: 'cjs',
      //   sourcemap: true,
      // },
      {
        file: `./dist/index.esm.js`,
        format: 'esm',
        sourcemap: true,
      },
      // {
      //   file: `./dist/index.js`,
      //   format: 'umd',
      //   name: 'RTCClient',
      //   sourcemap: true,
      // },
      // {
      //   file: `./dist/index.min.js`,
      //   format: 'umd',
      //   name: 'RTCClient',
      //   sourcemap: true,
      // },
    ],
    plugins: [
      esbuild({
        target: 'es2015',
      }),
      commonjs(),
      json(),
      terser()
    ],
  },
  {
    input: `./src/core/index.ts`,
    output: [
      // { file: `./dist/index.cjs.d.ts`, format: 'cjs' },
      { file: `./dist/index.esm.d.ts`, format: 'esm' },
      // { file: `./dist/index.d.ts`, format: 'umd' },
      // { file: `./dist/index.min.d.ts`, format: 'umd' },
    ],
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
        },
      }),
    ],
  },
]);
export default config;
