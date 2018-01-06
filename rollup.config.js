var typescript = require('rollup-plugin-typescript');

module.exports = {
  input: './src/index.ts',
  output: {
    file: 'index.js',
    format: 'cjs',
    name: 'StripWhitespace',
    sourcemap: true,
  },
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