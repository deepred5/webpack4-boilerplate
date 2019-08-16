import React, { Component } from 'react';
import ReactDom from 'react-dom';
import logo from '@/assets/img/girl.jpg';
import '@/styles/index.scss';
import './index.scss';
import { util } from '@/utils/index';
util();

class Demo extends Component {
  render() {
    return (
      <div className="success">
        <h1><span className="iconfont icon-check-circle check"></span>success</h1>
        <img src={logo} className="logo" />
      </div>
    )
  }
}
ReactDom.render(<Demo />, document.getElementById('app'));
