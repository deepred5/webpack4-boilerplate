import React, { useEffect, useState } from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import { hot } from 'react-hot-loader/root';
import Link from './components/Link';
import '@/common/index';
import './index.scss';
import { util } from '@/utils/index';

util();


function Demo() {

  const [name, setName] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('http://deepred5.com/cors.php');
      console.log(data);
      setName(data.name);
    }

    fetchData()
  }, []);
  return (
    <div className="home">
      <p onClick={() => alert(name)}>姓名: {name}</p>
      <span className="iconfont icon-info-circle">请选择跳转路径</span>
      <Link />
    </div>
  )
}
const App = hot(Demo);
ReactDom.render(<App />, document.getElementById('app'));