'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cover from './modules/Cover';
import Contain from './modules/Contain';

export default class Img extends Component {
  static displayName = 'Img';

  static propTypes = {
    /**
     * 图片显示模式
     */
    type: PropTypes.oneOf(['cover', 'contain']),
    /**
     * 图片 url
     */
    src: PropTypes.string.isRequired,
    /**
     * 图片的 title，hover 上去会显示出来
     */
    title: PropTypes.string,
    /**
     * 图片加载失败的兜底图片
     */
    errorImgSrc: PropTypes.string,
    /**
     * 图片加载失败的回调方法
     */
    onError: PropTypes.func,
    /**
     * 图片显示宽度
     */
    width: PropTypes.number,
    /**
     * 图片显示高度
     */
    height: PropTypes.number,
    /**
     * 图片的 alt 通常用于屏幕阅读器（盲人）识别
     */
    alt: PropTypes.string,
    /**
     * 形状展现
     */
    shape: PropTypes.string,
    /**
     * 启用阿里 CDN 图片优化压缩后缀
     */
    enableAliCDNSuffix: PropTypes.bool,
  };

  static defaultProps = {
    type: 'cover',
    alt: '',
    title: '',
    errorImgSrc: '',
    className: '',
    shape: 'sharp',
    enableAliCDNSuffix: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      src: props.src,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('src' in nextProps) {
      this.setState({
        src: nextProps.src,
      });
    }
  }

  handleImgLoadError = () => {
    if (this.props.errorImgSrc) {
      this.setState({
        src: this.props.errorImgSrc,
      });
    }
    this.props.onError && this.props.onError();
  };

  render() {
    const { type } = this.props;

    if (type === 'contain') {
      return (
        <Contain
          {...this.props}
          {...this.state}
          onError={this.handleImgLoadError}
        />
      );
    }

    return (
      <Cover
        {...this.props}
        {...this.state}
        onError={this.handleImgLoadError}
      />
    );
  }
}
