import React, { Component } from 'react';

const LIGHT = require('./images/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png');
const DARK = require('./images/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png');

export default class Logo extends Component {
  render() {
    const { isDark } = this.props;
    const logo = isDark ? DARK : LIGHT;
    return (
      <a href="/" style={{ display: 'block', marginTop: '6px' }}>
        <img src={logo} width="114" alt="logo" />
      </a>
    );
  }
}
