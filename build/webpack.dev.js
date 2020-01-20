const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const apiMocker = require('mocker-api');
const devServerProxy = require('./devServerProxy');

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]/bundle.js',
    chunkFilename: 'js/[name]/bundle.chunk.js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    overlay: true,
    port: 9001,
    open: true,
    hot: true,
    before(app) {
      apiMocker(app, path.resolve(__dirname, '../mock/index.js'))
    },
    proxy: devServerProxy,
    host: '0.0.0.0'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader',
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: ['style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      }
    ]
  },
  plugins: []
}

module.exports = merge(baseConfig, devConfig);