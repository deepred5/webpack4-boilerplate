const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');

/**
 * 多页面路口
  {
    'trade-index': './src/pages/trade-index/index.js',
    'trade-success': './src/pages/trade-success/index.js',
    'trade-fail': './src/pages/trade-fail/index.js'
  }
 */

// React兼容低版本
// import 'core-js/es/map';
// import 'core-js/es/set';

// axios兼容ie11
// import 'core-js/es/promise';

function getEntry(globPath) {
  const files = glob.sync(globPath);

  const entries = {};

  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop();
    entries[entryName] = ['core-js/es/map', 'core-js/es/set', 'core-js/es/promise', entry]
  });

  return entries;
}

/**
 * 多页面html模板
 [new HtmlWebpackPlugin(
    {
      template: './src/pages/trade-index/index.html',
      filename: 'trade-index.html',
      chunks: ['trade-index', 'common', 'vendor'],
    }
  )]
 */
function getHtmlWebpackPlugin(globPath) {
  const files = glob.sync(globPath);

  const htmlArr = [];

  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop();
    htmlArr.push(new HtmlWebpackPlugin(
      {
        template: entry,
        filename: entryName + '.html',
        chunks: [entryName, 'vendor', 'common'], // common和vendor是splitChunks抽取的公共文件
      }
    ));
  });

  return htmlArr;
}

module.exports = {
  getEntry,
  getHtmlWebpackPlugin
}