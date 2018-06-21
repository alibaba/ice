import React, { Component } from 'react';

const LIGHT = require('./images/lightLogo.png');
const DARK = require('./images/darkLogo.png');

export default class Logo extends Component {
  render() {
    const { isDark } = this.props;
    const logo = isDark ? DARK : LIGHT;
    return (
      <div
        className="logo"
        style={{
          height: 32,
          color: '#f40',
          textAlign: 'left',
        }}
      >
        <a href="/" style={{ display: 'block', position: 'relative' }}>
          <img src={logo} width="114" alt="logo" />
        </a>
      </div>
    );
  }
}
