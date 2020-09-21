/**
 * 多页面共用的全局方法
 * 1. 导入公共的index.scss
 * 2. 根据url参数动态添加vconsole
 */

import '@/styles/index.scss';

if (/debug=1/i.test(window.location.search)) {
  const loadJs = (src, callback) => {
    const sc = document.createElement('script');
    sc.type = 'text/javascript';
    sc.src = src;
    if (callback) {
      if (document.addEventListener) {
        sc.addEventListener("load", callback, false);
      } else {
        sc.onreadystatechange = () => {
          if (/loaded|complete/.test(sc.readyState)) {
            sc.onreadystatechange = null;
            callback();
          }
        };
      }
    }
    document.head.appendChild(sc);
  }

  loadJs('//cdn.bootcdn.net/ajax/libs/vConsole/3.3.4/vconsole.min.js', () => {
    /* eslint-disable-next-line no-undef, no-new */
    new VConsole();
  });
}