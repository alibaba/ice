/* eslint-disable react/self-closing-comp */

import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import isInElectron from '../../utils/isInElectron';
import '../../global.scss';
import './index.scss';

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

let ipcRenderer;
if (isInElectron) {
  const electron = window.require('electron');
  ipcRenderer = electron.ipcRenderer;
}

function Main() {
  const [ state, setState ] = useState({ logs: [] });
  useEffect(() => {
    ipcRenderer.on('logs', (e, data) => {
      console.log('event: logs!!!');

      state.logs.push(data);
      setState({
        ...state,
      });
    });
  }, []);

  console.log('state', state);

  return (
    <div className="main">
      <div className="lds-facebook"><div></div><div></div><div></div></div>
      <div>
        Loading...
      </div>
      <div className="logs">
        {
          state.logs.map((text) => {
            return (
              <div>
                {text}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

ReactDOM.render(<Main />, ICE_CONTAINER);