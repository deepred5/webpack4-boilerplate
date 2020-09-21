/**
 * 多页面共用的全局方法
 * 1. 导入公共的index.scss
 * 2. 导入fastclick.js
 * 3. 导入vconsole.js
 */

import '@/styles/index.scss';

import fastclick from 'fastclick';

// ios 11.3+ input使用原生输入法不灵敏
// https://github.com/ftlabs/fastclick/issues/548
fastclick.prototype.focus = function (targetElement) {
  targetElement.focus();
};
// eslint-disable-next-line compat/compat
fastclick.attach(document.body);

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
