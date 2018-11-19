import { shell } from 'electron';
import React, { Component } from 'react';

class BrowserLink extends Component {
  render() {
    const { href, style = {} } = this.props;
    return (
      <a
        {...this.props}
        style={{
          textDecoration: 'none',
          ...style,
        }}
        onClick={(event) => {
          event.preventDefault();
          shell.openExternal(href);
        }}
      />
    );
  }
}

export default BrowserLink;
