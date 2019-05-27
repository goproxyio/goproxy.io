const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractText = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const { NODE_ENV } = process.env
const root = process.cwd()
const distPath = path.join(root, 'dist')

const config = {
  // mode: NODE_ENV === 'development' ? 'development ' : 'production',
  mode: 'development',
  context: root,
  devtool: 'source-map',
  entry: './src/app.js',
  output: {
    path: distPath,
    publicPath: '/',
    filename: '[name].[hash:16].js'
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
          name: '[path][name].[ext]'
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
    test: /\.eot(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.woff(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.woff2(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  {
    test: /\.otf(\?.*)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
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
          name: '[path][name].[ext]'
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
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html'
  })
)

if (NODE_ENV !== 'development') {
  config.plugins.push(
    new ExtractText('[name].[md5:contenthash:hex:8].css')
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
