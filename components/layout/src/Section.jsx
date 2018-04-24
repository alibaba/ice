import React, { Component, Children } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class IceLayoutSection extends Component {
  static displayName = 'IceLayoutSection';

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
    const { style, className, children, scrollable, ...others } = this.props;
    let hasSider = false;

    Children.forEach(children, (child) => {
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
      'ice-layout-section',
      {
        'ice-layout-section-has-aside': hasSider,
        'ice-layout-scrollable': scrollable,
      },
      className
    );

    let childrenElement;

    if (scrollable) {
      childrenElement = (
        <div className="ice-layout-section-inner">{children}</div>
      );
    } else {
      childrenElement = children;
    }

    return (
      <div {...others} className={classes} style={style}>
        {childrenElement}
      </div>
    );
  }
}
