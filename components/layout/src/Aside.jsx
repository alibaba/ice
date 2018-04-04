import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Trigger from './AsideTrigger';

export default class IceLayoutAside extends Component {
  static displayName = 'IceLayoutAside';

  static propTypes = {
    /**
     * 是否收起
     */
    collapsed: PropTypes.bool,
    /**
     * 可滚动
     * @description Layout 开启 fixable 后有效
     */
    scrollable: PropTypes.bool,
    /**
     * 收起后的宽度
     */
    collapsedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * collapsed 收起状态切换
     * @params {Boolean} 切换后的状态
     */
    onCollapseChange: PropTypes.func,
    /**
     * 展示默认 trigger
     */
    trigger: PropTypes.bool,
    /**
     * 宽度
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * 主题
     */
    theme: PropTypes.oneOf(['dark', 'light']),
  };

  static defaultProps = {
    theme: 'light',
    collapsed: undefined,
    collapsedWidth: 80,
    onCollapseChange: () => {},
    scrollable: false,
    trigger: false,
    width: 200,
  };

  constructor(props) {
    super(props);
    this.state = {
      collapsed: props.collapsed,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('collapsed' in nextProps) {
      if (nextProps.collapsed !== this.props.collapsed) {
        this.setState({
          collapsed: nextProps.collapsed,
        });
      }
    }
  }

  handleTriggerClick = (collapsed) => {
    this.setState({
      collapsed,
    });

    if (typeof this.props.onCollapseChange === 'function') {
      this.props.onCollapseChange(collapsed);
    }
  };

  render() {
    const {
      children,
      className,
      collapsedWidth,
      scrollable,
      style,
      theme,
      trigger,
      width,
      onCollapseChange,
      collapsed,
      ...others
    } = this.props;

    const classes = classNames(
      'ice-layout-aside',
      {
        'ice-layout-scrollable': scrollable,
        'ice-layout-aside-has-trigger': trigger === true,
        [`ice-layout-theme-${theme}`]: theme,
      },
      className
    );

    const widthValue = typeof width === 'number' ? `${width}px` : width;

    const collapsedWidthValue =
      typeof collapsedWidth === 'number'
        ? `${collapsedWidth}px`
        : collapsedWidth;

    const asideStyle = {
      ...style,
      flex: `0 0 ${this.state.collapsed ? collapsedWidthValue : widthValue}`,
      width: `${this.state.collapsed ? collapsedWidthValue : widthValue}`,
    };

    return (
      <div {...others} className={classes} style={asideStyle}>
        {children}
        {trigger === true && (
          <Trigger
            onClick={this.handleTriggerClick}
            collapsed={this.state.collapsed}
          />
        )}
      </div>
    );
  }
}

IceLayoutAside.Trigger = Trigger;
