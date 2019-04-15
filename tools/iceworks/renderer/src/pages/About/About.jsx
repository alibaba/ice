import React, { Component } from 'react';

import { remote } from 'electron';
import './App.scss';

const appName = remote.app.getName();

class About extends Component {
  constructor(props) {
    super(props);

    this.remote = remote;
    this.state = {
      version: remote.app.getVersion(),
    };
  }

  openLink = (event) => {
    const link = event.target;
    this.remote.shell.openExternal(link.href);
    event.preventDefault();
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
          <div className="version">版本 {this.state.version}</div>
          <div className="copyright">
            版权所有 &copy; 2018 阿里巴巴集团 保留所有权利
          </div>
        </div>
      </div>
    );
  }
}

export default About;
