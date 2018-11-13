import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutMain extends Component {
  static displayName = 'IceLayoutMain';

  static propTypes = {
    /**
     * 可滚动
     * @description Layout 开启 fixable 后有效
     */
    scrollable: PropTypes.bool,
  };

  static defaultProps = {
    scrollable: false,
  };

  render() {
    const { children, className, style, scrollable, ...others } = this.props;
    const classes = classNames(
      'ice-layout-main',
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
