const path = require('path')
const tsConfig = require('./tsconfig.json')

const extractTSPaths = () => {
  const { baseUrl, paths } = tsConfig.compilerOptions
  const replaceWildCard = val => val.replace('/*', '')

  if (!baseUrl || !paths || paths.length === 0) return []

  return Object.entries(paths).map(([key, [val]]) => ({
    key: replaceWildCard(key),
    path: path.resolve(__dirname, baseUrl, replaceWildCard(val))
  }))
}

const bundleReportPlugin = {
  resolve: '@poi/bundle-report',
  options: {
    openAnalyzer: false,
    analyzerMode: 'static'
  }
}

module.exports = {
  plugins: [bundleReportPlugin],
  chainWebpack: c => {
    for (const { key, path } of extractTSPaths()) {
      c.resolve.alias.set(key, path)
    }
  }
}
