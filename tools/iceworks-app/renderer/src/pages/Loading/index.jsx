/* eslint-disable react/self-closing-comp */

import ReactDOM from 'react-dom';
import React from 'react';
import '../../global.scss';
import './index.scss';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

function Main() {
  return (
    <div className="main">
      <div className="lds-facebook"><div></div><div></div><div></div></div>
      <div>
        Loading...
      </div>
    </div>
  );
}

ReactDOM.render(<Main />, ICE_CONTAINER);