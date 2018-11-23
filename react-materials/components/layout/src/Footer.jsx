import React, { Component } from 'react';
import classNames from 'classnames';

export default class IceLayoutFooter extends Component {
  static displayName = 'IceLayoutFooter';

  render() {
    const { style, className, children, ...others } = this.props;
    const classes = classNames('ice-layout-footer', className);
    return (
      <div {...others} className={classes} style={style}>
        {children}
      </div>
    );
  }
}
