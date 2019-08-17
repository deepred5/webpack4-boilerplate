import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import Link from './components/Link';
import '@/styles/index.scss';
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
ReactDom.render(<Demo />, document.getElementById('app'));