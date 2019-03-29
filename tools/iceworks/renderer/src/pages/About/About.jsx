import React, { Component } from 'react';

import { remote, shell } from 'electron';
import './App.scss';

const appName = remote.app.getName();
const version = remote.app.getVersion();

class About extends Component {
  constructor(props) {
    super(props);
  }

  openLink = (event) => {
    const link = event.target;
    event.preventDefault();
    shell.openExternal(link.href);
  };

  render() {
    return (
      <div className="about">
        <div key="r1" className="about-body">
          <div className="logo">
            <img src={require('../../static/logo.png')} height={64} />
          </div>
          <div className="appname">
            <b>{appName}</b>
          </div>
          <div className="version">版本 {version}</div>
          <div className="copyright">
            版权所有 &copy; 2018 阿里巴巴集团 保留所有权利
          </div>
        </div>
      </div>
    );
  }
}

export default About;
