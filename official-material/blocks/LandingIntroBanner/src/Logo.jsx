import React, { PureComponent } from 'react';
import { Link } from 'react-router';

export default class Logo extends PureComponent {
  render() {
    const { style } = this.props;
    return (
      <div
        className="logo"
        style={{
          height: 32,
          color: '#f40',
          textAlign: 'left',
          ...style,
        }}
      >
        <Link to="/">
          <span
            style={{
              fontSize: 36,
              color: '#3080FE',
              fontWeight: 'bold',
              fontFamily: 'Helvetica, sans-serif',
            }}
          >
            ICE
          </span>
          <div
            style={{
              display: 'inline-block',
              lineHeight: '14px',
              color: '#3080FE',
              fontSize: '13px',
              marginLeft: 6,
            }}
          >
            ICE
            <br />
            Design
          </div>
        </Link>
      </div>
    );
  }
}
