import cjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'

export default {
  plugins: [
    cjs(),
    json(),
    resolve({ preferBuiltins: false })
  ]
}
