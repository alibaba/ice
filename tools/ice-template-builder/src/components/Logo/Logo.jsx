/* eslint object-shorthand: 0 */
import React, { PureComponent } from 'react';

import './scss/dark.scss';
import './scss/light.scss';

export default class Logo extends PureComponent {
  render() {
    const { color } = this.props;
    const logoStyle = color ? { color: color } : {};

    return (
      <div className="logo" style={{}}>
        <a href="#" className="logo-text" style={{ ...logoStyle }}>
          LOGO
        </a>
      </div>
    );
  }
}
