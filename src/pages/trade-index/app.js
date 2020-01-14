import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { hot } from 'react-hot-loader/root';
import Link from './components/Link';
import '@/common/index';
import './index.scss';
import { util } from '@/utils/index';
util();


function Demo() {
  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/girls');
      console.log(data);
    }

    fetchData()
  }, []);
  return (
    <div className="home">
      <span className="iconfont icon-info-circle">请选择跳转路径</span>
      <Link />
    </div>
  )
}
const App = hot(Demo);
ReactDom.render(<App />, document.getElementById('app'));