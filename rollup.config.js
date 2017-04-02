var typescript = require('rollup-plugin-typescript');

module.exports = {
  entry: './src/index.ts',
  dest: 'index.js',
  format: 'cjs',
  moduleId: 'strip-whitespace',
  moduleName: 'strip-whitespace',
  sourceMap: true,
  external: [
    'assert',
    'fs',
    'path',
    'typescript'
  ],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
  ]
};