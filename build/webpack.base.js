const path = require('path');
const { getEntry, getHtmlWebpackPlugin } = require('./util');

module.exports = {
  entry: getEntry('./src/pages/**/app.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8kb压缩成base64,大于8kb单独提取
              name: '[name].[hash:7].[ext]', // images/[name].[hash:7].[ext] 也可以指定路径
              outputPath: "images", // 图片输出路径
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff2?)$/,
        loader: "file-loader", // file-loader直接拷贝文件，不会转成base64
        options: {
          name: '[name].[hash:7].[ext]',
          outputPath: "fonts", // 字体输出路径
        },
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中公共代码  priority低，后提取
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 3,
        },
        // 打包node_modules中的文件 priority更高，先提取
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2,
        }
      }
    },
    runtimeChunk: { name: 'manifest' } // 运行时代码
  },
  plugins: [
    ...getHtmlWebpackPlugin('./src/pages/**/*.html')
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // 默认后缀名
    alias: {
        '@': path.resolve(__dirname, '../src'), // 别名
    }
}
}