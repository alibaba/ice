import React from 'react';
import ReactDOM from 'react-dom';
import isInElectron from '../../utils/isInElectron';
import './index.scss';

let appName = '';
let version = '';

if (isInElectron) {
  const electron = window.require('electron');
  appName = electron.remote.app.getName();
  version = electron.remote.app.getVersion();
}

const ICE_CONTAINER = document.getElementById('ice-container');

if (!ICE_CONTAINER) {
  throw new Error('当前页面不存在 <div id="ice-container"></div> 节点.');
}

function About() {
  return (
    <div className="about">
      <div key="r1" className="about-body">
        <div className="logo">
          <img alt="iceworks" src="https://img.alicdn.com/tfs/TB1iDPObND1gK0jSZFsXXbldVXa-44-44.png" height={64} />
        </div>
        <div className="appname">
          <b>{appName}</b>
        </div>
        <div className="version">
          版本：{version}
        </div>
        <div className="copyright">
          版权所有 &copy; 2018 阿里巴巴集团 保留所有权利
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<About />, ICE_CONTAINER);