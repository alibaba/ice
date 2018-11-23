import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutLayout extends Component {
  static displayName = 'IceLayoutLayout';

  static propTypes = {
    /**
     * 布局模块滚动跟随模式
     */
    fixable: PropTypes.bool,
  };

  static defaultProps = {
    fixable: false,
  };

  render() {
    const { style, className, children, fixable, ...others } = this.props;
    let hasSider = false;

    React.Children.forEach(children, (child) => {
      if (
        child &&
        child.type &&
        child.type.displayName &&
        child.type.displayName === 'IceLayoutAside'
      ) {
        hasSider = true;
      }
    });

    const classes = classNames(
      'ice-layout',
      {
        'ice-layout-fixable': fixable,
        'ice-layout-has-aside': hasSider,
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
