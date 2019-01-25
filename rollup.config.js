import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import requireContext from 'rollup-plugin-require-context'
import pkg from './package.json';
import {join} from 'path'

export default [{
  input: join(__dirname, 'source/LuxPad.js'),
  output: {
    file: join(__dirname, '/dist/lux_bundle.js'),
    format: 'umd',
    name: "LuxPad"
  },
  name: 'LuxPad',
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**'
    })
  ]
}]
