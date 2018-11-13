import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './main.scss';
const linkTagCache = {};

export default class DynamicIcon extends Component {
  static displayName = 'DynamicIcon';

  static propTypes = {
    /**
     * 指定显示哪种图标
     */
    type: PropTypes.string,
    /**
     * 指定图标大小
     */
    size: PropTypes.oneOf([
      'xxs',
      'xs',
      'small',
      'medium',
      'large',
      'xl',
      'xxl',
      'xxxl'
    ])
  };

  static defaultProps = {
    size: 'medium'
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { className, size, type, ...others } = this.props;
    const classes = cx({
      [`ice-icon-stable-${size}`]: !!size,
      ['ice-icon-stable']: true,
      [`ice-icon-stable-${type}`]: !!type,
      [className]: !!className
    });
    return <i {...others} className={classes} />;
  }
}
