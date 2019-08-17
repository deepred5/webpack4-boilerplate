const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');

const publicPath = '/';

const prodConfig = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]/bundle.[contenthash:8].js',
    chunkFilename: '[name]/bundle.[contenthash:8].chunk.js', // splitChunks提取公共js时的命名规则
    publicPath: publicPath,
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
        test: /\.scss$/,
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
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json') // 读取dll打包后的manifest.json，分析哪些代码跳过
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../src/assets/dll/*.js'),
      publicPath: publicPath + "dll/",  // 注入到html中的路径
      outputPath: "dll", // 最终输出的目录
    }), // 把dll.js加进index.html里，并且拷贝文件到dist目录
    new ManifestPlugin({
      map(file) {
        const reg = /dll\/vendors/g;
        if (reg.test(file.name)) {
          // 默认dll打包出来的key带有hash值,重命名成不带hash值
          file.name = 'vendors.dll.js';
        }
        return file;
      }
    }), // 生成manifest.json
    new CleanWebpackPlugin(), // 打包前先删除之前的dist目录
  ]
};

module.exports = merge(baseConfig, prodConfig);