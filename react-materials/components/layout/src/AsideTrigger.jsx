import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon } from '@icedesign/base';

export default class IceLayoutAsideTrigger extends Component {
  static displayName = 'IceLayoutAsideTrigger';

  static propTypes = {
    collapsed: PropTypes.bool,
  };

  static defaultProps = {
    collapsed: false,
  };

  toggleCollapse = () => {
    const newCollapsed = !this.props.collapsed;
    this.props.onClick(newCollapsed);
  };

  render() {
    const { className, collapsed, style } = this.props;
    const classes = classNames(
      'ice-layout-aside-trigger',
      {
        'ice-layout-aside-trigger-collapsed': collapsed,
      },
      className
    );

    return (
      <div onClick={this.toggleCollapse} className={classes} style={style}>
        <Icon type="arrow-left" />
      </div>
    );
  }
}
