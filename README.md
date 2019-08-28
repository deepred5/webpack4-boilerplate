# webpack4-boilerplate
webpack4 多页面打包模板

* 支持React
* 支持scss, autoprefixer自动加浏览器前缀, icon字体图标
* ES6+语法 babel编译成 ES5语法 
* 提取公共css和js，自动添加版本号
* 打包压缩js和css
* Mock数据 接口转发

### 使用
安装
```
npm install
```

开发(默认开启本地mock)
```
npm run dev
```
预览: http://localhost:9001/trade-index

关闭mock
```
npm run dev:no-mock
```

接口代理(关闭本地mock，开启远程代理，用于后端联调)
```
npm run proxy
```

打包
```
npm run build
```
### 说明
***
`pages`目录下，每个文件夹为单独的一个页面

每个页面至少有两个文件配置:

`app.js`: 页面的逻辑入口

`index.html`: 页面的html打包模板

***

`assets`目录下，放静态资源，比如图片资源

***
`styles`目录下，放公共全局的css
***

可以自行添加文件夹，比如全局的`components`公共组件, `utils`全局工具方法
***
`mock`目录为本地mock数据，文档详见[mocker-api](https://github.com/jaywcjlove/mocker-api)
***
`build`目录为webpack打包配置，有详细的注解

代码分割使用的是`splitChunks`配置
```javascript
optimization: {
    splitChunks: {
      cacheGroups: {
        // 打包业务中公共代码
        common: {
          name: "common",
          chunks: "initial",
          minSize: 1,
          priority: 0,
          minChunks: 3, // 同时引用了3次才打包
        },
        // 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "initial",
          priority: 10,
          minChunks: 2, // 同时引用了2次才打包
        }
      }
    }
  }
```
接口代理详见`devServerProxy.js`
```javascript
const proxy = {
  '/api': {
    target: 'https://anata.me', // 后端地址
    changeOrigin: true,
    secure: false,
  },
}
```

### 其他
* 使用dll加快打包速度,参考项目分支[feature/dll](https://github.com/deepred5/webpack4-boilerplate/tree/feature/dll)