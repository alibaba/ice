import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import './Logo.scss';

export default class Logo extends PureComponent {
  render() {
    return (
      <div className="logo">
        <Link to="/" className="logo-text">
          LOGO
        </Link>
      </div>
    );
  }
}
