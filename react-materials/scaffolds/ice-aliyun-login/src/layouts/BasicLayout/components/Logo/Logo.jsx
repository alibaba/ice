import React, { PureComponent } from 'react';

const LIGHT = require('./images/lightLogo.png');
const DARK = require('./images/darkLogo.png');

export default class Logo extends PureComponent {
  render() {
    const { isDark } = this.props;
    const logo = isDark ? DARK : LIGHT;
    return (
      <div className="logo" style={this.props.style}>
        <img src={logo} alt="" width="114" />
      </div>
    );
  }
}
