/* eslint-disable react/self-closing-comp */

import ReactDOM from 'react-dom';
import React from 'react';
import isInElectron from '../../utils/isInElectron';
import '../../global.scss';
import './index.scss';

let logPath = '~/Library/Logs/iceworks/log.log';
let shell;
if (isInElectron) {
  const electron = window.require('electron');
  const remote = electron.remote;
  shell = electron.shell;
  const log = remote.require('electron-log');
  logPath = log.transports.file.findLogPath(remote.app.getName());
}

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

function Main() {
  function onClick() {
    if (isInElectron) {
      shell.showItemInFolder(logPath);
      shell.openItem(logPath);
    }
  }
  return (
    <div>
      <div className="face">
        <div className="band">
          <div className="red"></div>
          <div className="white"></div>
          <div className="blue"></div>
        </div>
        <div className="eyes"></div>
        <div className="dimples"></div>
        <div className="mouth"></div>
      </div>
      <h1>Oops! Something went wrong!</h1>
      <div className="log">
        <p>Please check log:</p>
        <div className="log-path" id="log_path">
          <p className="log-text" onClick={onClick}>
            {logPath}
          </p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<Main />, ICE_CONTAINER);