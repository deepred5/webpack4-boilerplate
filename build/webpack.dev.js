const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const apiMocker = require('mocker-api');
const devServerProxy = require('./devServerProxy');

// 正确引用路径，为了在后端引用js
const publicPath = process.env.BACKEND ? 'http://0.0.0.0:9001/' : '/';
// 跨域支持，为了在后端热更新
const headers = process.env.BACKEND ? {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
} : {}

const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'js/[name]/[name]-bundle.js',
    chunkFilename: 'js/[name]/[name]-bundle.js',
    publicPath
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
    host: '0.0.0.0',
    headers,
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