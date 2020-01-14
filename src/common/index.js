/**
 * 多页面共用的全局方法
 * 1. 导入公共的index.scss
 * 2. 导入fastclick.js
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

