import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutFooter extends Component {
  static displayName = 'IceLayoutFooter';

  static propTypes = {
    /**
     * 类型，背景色
     */
    type: PropTypes.oneOf(['none', 'normal', 'primary', 'secondary', 'line']),
  };

  static defaultProps = {
    type: 'normal',
  };

  render() {
    const { type, style, className, children, ...others } = this.props;
    const classes = classNames(
      'ice-layout-footer',
      `ice-layout-footer-${type}`,
      className
    );

    return (
      <div {...others} className={classes} style={style}>
        {children}
      </div>
    );
  }
}
