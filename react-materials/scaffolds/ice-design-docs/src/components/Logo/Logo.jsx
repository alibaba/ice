import React, { Component } from 'react';

const LIGHT =
  require('./images/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png');
const DARK =
  require('./images/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png');

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
