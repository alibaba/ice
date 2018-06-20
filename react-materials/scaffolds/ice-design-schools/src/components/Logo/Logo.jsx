import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo" style={this.props.style}>
        <img
          src={require('./images/TB13UQpnYGYBuNjy0FoXXciBFXa-242-134.png')}
          alt=""
          style={{ width: '40px' }}
        />
        <Link to="/" className="logo-text">
          LOGO
        </Link>
      </div>
    );
  }
}
