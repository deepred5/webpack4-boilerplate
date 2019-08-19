const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/bundle.[contenthash:8].js',
    chunkFilename: '[name]/bundle.[contenthash:8].chunk.js', // splitChunks提取公共js时的命名规则
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, // 单独提取css文件
          'css-loader',
          'postcss-loader'
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [MiniCssExtractPlugin.loader,
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
  plugins: [
    new MiniCssExtractPlugin({ // 单独提取css文件
      filename: '[name]/bundle.[contenthash:8].css',
      chunkFilename: '[name]/bundle.[contenthash:8].chunk.css', // splitChunks提取公共css时的命名规则
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true } // 压缩打包的css
    }),
    new ManifestPlugin(), // 生成manifest.json
    new CleanWebpackPlugin(), // 打包前先删除之前的dist目录
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({ // 去掉console
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
        },
      }),
    ],
  }
};

module.exports = merge(baseConfig, prodConfig);