import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Link from './components/Link';
import '@/styles/index.scss';
import './index.scss';
import { util } from '@/utils/index';
util();

class Demo extends Component {
  render() {
    return (
      <div className="home">
        <span className="iconfont icon-info-circle">请选择跳转路径</span>
        <Link />
      </div>
    )
  }
}
ReactDom.render(<Demo />, document.getElementById('app'));
