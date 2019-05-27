const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const { NODE_ENV } = process.env
const root = process.cwd()
const distPath = path.join(root, 'dist')

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
  test: /\.html$/,
  use: {
    loader: 'html-loader'
  }
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
  ]),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
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

if (NODE_ENV !== 'development') {
  config.plugins.push(
    new ExtractText('css/[name].[md5:contenthash:hex:16].css')
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