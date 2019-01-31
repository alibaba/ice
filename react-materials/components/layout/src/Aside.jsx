import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutAside extends Component {
  static displayName = 'IceLayoutAside';

  static propTypes = {
    /**
     * 可滚动
     * @description Layout 开启 fixable 后有效
     */
    scrollable: PropTypes.bool,
    /**
     * 类型，背景色
     */
    type: PropTypes.oneOf(['none', 'normal', 'primary', 'secondary', 'line']),
  };

  static defaultProps = {
    scrollable: false,
    type: 'normal',
  };

  render() {
    const {
      type,
      children,
      className,
      scrollable,
      style,
      ...others
    } = this.props;

    const classes = classNames(
      'ice-layout-aside',
      `ice-layout-aside-${type}`,
      {
        'ice-layout-scrollable': scrollable,
      },
      className
    );

    return (
      <div {...others} className={classes} style={style}>
        {children}
      </div>
    );
  }
}
