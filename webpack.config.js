const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const localesData = require('./src/i18n')
const locales = require('./src/i18n/locales.json')

const { NODE_ENV } = process.env
const isProd = NODE_ENV === 'production'

const root = process.cwd()
const distPath = path.join(root, 'dist')
const localeNames = Object.keys(localesData)

const config = {
  mode: NODE_ENV === 'development' ? 'development' : 'production',
  context: root,
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: distPath,
    publicPath: '/',
    filename: 'js/[name].[hash:16].js'
  },
  plugins: [],
  module: {
    rules: [
    ]
  }
}

/**
 * Html loaders
 */
config.module.rules.push({
  test: /\.ejs/,
  use: [
    'extract-loader',
    'html-loader',
    'ejs-loader'
  ]
})

/**
 * JavaScript/Babel loader
 */
config.module.rules.push({
  test: /\.jsx?$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader',
      options: {
        compact: false
      }
    }
  ]
})

/**
 * CSS loaders
 */

let extractCSS

if (NODE_ENV === 'production') {
  extractCSS = loaders => ExtractText.extract({
    fallback: 'style-loader',
    use: loaders
  })
} else {
  extractCSS = loaders => ['style-loader', ...loaders]
}

config.module.rules.push(
  {
    test: /\.css$/,
    use: extractCSS([
      {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader'
      }
    ])
  }
)

/**
 * Images: png/jpg/gif/svg
 */
config.module.rules.push(
  {
    test: /\.(png|jpe?g|gif|svg)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:16].[ext]',
          outputPath: 'images'
        }
      }
    ]
  }
)

/**
 * Fonts: eot/wott/wott2/otf/ttf
 */
config.module.rules.push(
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:16].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  {
    test: /\.ttf(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[name].[hash:16].[ext]',
          outputPath: 'fonts'
        }
      }
    ]
  }
)

/**
 * Plugins
 */
config.plugins.push(
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin([
    { from: 'public', to: '' }
  ])
)

for (const localeName of localeNames) {
  const filename = localeName === 'en' ? 'index.html' : `${localeName}/index.html`
  config.plugins.push(
    new HtmlWebpackPlugin({
      filename,
      template: 'src/index.ejs',
      templateParameters: {
        isProd,
        thisYear: new Date().getFullYear(),
        locales,
        localeName,
        localeData: localesData[localeName]
      },
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmtpyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  )
}

if (NODE_ENV !== 'development') {
  config.plugins.push(
    new ExtractText('css/[name].[md5:contenthash:hex:16].css'),
    new OfflinePlugin()
  )
}

/**
 * devServer
 */
if (NODE_ENV === 'development') {
  config.devServer = {
    contentBase: distPath,
    port: 8080,
    open: true
  }
}

module.exports = config
