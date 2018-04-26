import React, { Component } from 'react';

export default class Logo extends Component {
  render() {
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
          <img
            src="https://img.alicdn.com/tfs/TB1saOBbYGYBuNjy0FoXXciBFXa-218-58.png"
            width="129"
            height="35"
            alt=""
          />
        </a>
      </div>
    );
  }
}
