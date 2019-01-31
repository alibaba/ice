import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutHeader extends Component {
  static displayName = 'IceLayoutHeader';

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
    const {
      type,
      style,
      className,
      children,
      ...others
    } = this.props;

    const classes = classNames(
      'ice-layout-header',
      `ice-layout-header-${type}`,
      className
    );

    return (
      <div {...others} className={classes} style={style}>
        {children}
      </div>
    );
  }
}
