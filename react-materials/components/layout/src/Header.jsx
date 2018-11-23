import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutHeader extends Component {
  static displayName = 'IceLayoutHeader';

  static propTypes = {
    /**
     * 主题
     */
    theme: PropTypes.oneOf(['dark', 'light']),
    /**
     * 子元素垂直对齐方式
     */
    alignItems: PropTypes.oneOf([
      'flex-start',
      'flex-end',
      'center',
      'baseline',
      'stretch',
    ]),
  };

  static defaultProps = {
    theme: 'light',
    alignItems: 'center',
  };

  render() {
    const {
      alignItems,
      style,
      className,
      children,
      theme,
      ...others
    } = this.props;

    const classes = classNames(
      'ice-layout-header',
      {
        [`ice-layout-theme-${theme}`]: theme,
      },
      className
    );

    const divStyle = {
      ...style,
      alignItems,
    };

    return (
      <div {...others} className={classes} style={divStyle}>
        {children}
      </div>
    );
  }
}
