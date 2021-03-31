const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

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

function filterEntry(files) {
  const customPagesPath = path.resolve(__dirname, '../customPages.json');
  const exists = fs.existsSync(customPagesPath);

  if (exists) {
    const customPagesTxt = fs.readFileSync(customPagesPath, { encoding: 'utf-8' });
    try {
      const customPagesObj = JSON.parse(customPagesTxt);
      if (customPagesObj && customPagesObj.pages && customPagesObj.pages.length) {
        files = files.filter((file) => customPagesObj.pages.some((page) => file.indexOf(page) > -1));
      }
    } catch {
      console.info('customPages.json 文件格式不对');
    } finally {
      return files;
    }
  }

  return files;
}

function getEntry(globPath) {
  let files = glob.sync(globPath);

  if (process.env.CUSTOM) {
    files = filterEntry(files);
  }

  const entries = {};

  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop();
    entries[entryName] = ['core-js/es/map', 'core-js/es/set', 'core-js/es/promise', 'react-hot-loader/patch', entry]
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
  let files = glob.sync(globPath);

  if (process.env.CUSTOM) {
    files = filterEntry(files);
  }

  const htmlArr = [];

  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop();
    htmlArr.push(new HtmlWebpackPlugin(
      {
        template: entry,
        filename: entryName + '/index.html',
        chunks: [entryName, 'vendor', 'common', 'manifest'], // common和vendor是splitChunks抽取的公共文件 manifest是运行时代码
      }
    ));
  });

  return htmlArr;
}


/**
 * PrerenderSPAPlugin预渲染
 [new PrerenderSPAPlugin({
    indexPath: path.resolve(__dirname, '../dist', 'trade-index', 'index.html'),
    staticDir: path.resolve(__dirname, '../dist'),
    routes: ['/trade-index'],
  })]
 */
function getPrerenderSPAPlugin(globPath) {
  let files = glob.sync(globPath);

  const prerenderArr = [];

  files.forEach(entry => {
    const entryName = path.dirname(entry).split('/').pop();
    prerenderArr.push(new PrerenderSPAPlugin(
      {
        indexPath: path.resolve(__dirname, '../dist', entryName, 'index.html'),
        staticDir: path.resolve(__dirname, '../dist'),
        routes: [`/${entryName}`],
        renderer: new Renderer({
          renderAfterTime: 2000, // Wait 2 seconds.
        }),
      }
    ));
  });

  return prerenderArr;
}

module.exports = {
  getEntry,
  getHtmlWebpackPlugin,
  getPrerenderSPAPlugin,
}