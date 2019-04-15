// http://www.iconfont.cn/manage/index?manage_type=myprojects&projectId=568722&keyword=

// 使用 custom 生成自定义 ICON 组件

import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const fontFamily = 'iceworks';
const prefix = 'iceworks';

import './iconfont/iconfont.css';

class Icon extends Component {
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
      'xxxl',
    ]),
  };
  static defaultProps = {
    size: 'medium',
  };

  render() {
    const { className, size, type, ...other } = this.props;
    const classes = cx({
      [`${prefix}-${size}`]: !!size,
      [`${fontFamily}`]: true,
      [`${prefix}-${type}`]: !!type,
      [className]: !!className,
    });
    return <i {...other} className={classes} />;
  }
}

export default Icon;
