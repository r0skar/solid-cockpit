module.exports = {
  presets: [
    ['poi/babel'],
    ['solid'],
    [
      '@babel/preset-env',
      {
        modules: false,
        corejs: 3,
        useBuiltIns: 'usage',
        exclude: ['transform-regenerator', 'transform-async-to-generator']
      }
    ]
  ],
  plugins: [
    ['module:fast-async', { spec: true }],
    ['@babel/proposal-optional-chaining'],
    ['@babel/proposal-nullish-coalescing-operator'],
    ['@babel/proposal-class-properties'],
    ['@babel/proposal-object-rest-spread'],
    ['@babel/syntax-dynamic-import'],
    ['lodash'],
    ['date-fns']
  ]
}
