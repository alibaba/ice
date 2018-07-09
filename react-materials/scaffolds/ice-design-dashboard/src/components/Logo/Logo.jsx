import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './Logo.scss';

const LOGO = require('./images/logo.png');

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <img src={LOGO} alt="" style={{ width: '40px' }} />
        <Link to="/" className="logo-text">
          LOGO
        </Link>
      </div>
    );
  }
}
