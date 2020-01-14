import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import logo from '@/assets/img/girl.jpg';
import '@/common/index';
import './index.scss';
import { util } from '@/utils/index';

util();

class Demo extends Component {
  render() {
    return (
      <div className="success">
        <h1><span className="iconfont icon-check-circle check" />success</h1>
        <img src={logo} className="logo" alt="" />
      </div>
    )
  }
}
const App = hot(Demo);

ReactDom.render(<App />, document.getElementById('app'));
