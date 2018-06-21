import * as webpack from 'webpack'
import * as path from 'path'

const ENV = process.env.NODE_ENV
const SRC = path.join(__dirname, 'src')
const DEST = path.join(__dirname, 'app')

// _____________

const module = {
  rules: [
    {
      test: /\.(ts|tsx)$/,
      exclude: /node_modules/,
      use: [{ loader: 'ts-loader' }]
    }
  ]
}

// _____________

const resolve = {
  extensions: [ '.js', '.ts', '.tsx' ],
  alias: { '~': `${SRC}` }
}

// _____________

const entries = row => {
  const entries = {}
  row.map(entry => {
    const name = `${entry}`
    entries[name] = `${SRC}/${entry}`
  })
  return entries
}
const javascripts = entries(['app'])
const entry = Object.assign({}, javascripts)

// _____________

const output = {
  path: DEST,
  filename: '[name].js',
  publicPath: '/'
}

// _____________

const provide = new webpack.ProvidePlugin({ 'React': 'preact' })
const hotModuleReplacement = new webpack.HotModuleReplacementPlugin()
const plugins = ENV === 'production' ? [provide] : [provide, hotModuleReplacement]

// _____________

const devtool = '#inline-source-map'
const devServer = {
  contentBase: DEST,
  host: 'localhost',
  port: '1234',
  inline: true,
  hot: true,
  quiet: true
}

// _____________

export default { module, resolve, entry, output, plugins, devtool, devServer }
