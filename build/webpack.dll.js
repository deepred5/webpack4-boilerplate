const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const dllPath = path.resolve(__dirname, "../src/assets/dll"); // dll文件存放的目录

module.exports = {
  mode: 'production',
  entry: {
    vendors: ['react', 'react-dom', 'axios'] // 手动指定打包哪些库
  },
  output: {
    path: dllPath,
    filename: '[name].[hash:8].dll.js',
    library: '_dll_[name]'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DllPlugin({
      path: path.join(__dirname, './dll/[name].manifest.json'), // 生成对应的manifest.json，给webpack打包用
      name: '_dll_[name]',
    }),
  ],
}