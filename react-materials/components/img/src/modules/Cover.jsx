import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import aliCDNSuffix from './aliCDNSuffix';

export default class Cover extends Component {
  static displayName = 'Cover';

  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    style: PropTypes.object,
    onError: PropTypes.func,
  };

  static defaultProps = {
    onError: () => {},
    alt: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      imgStyles: {
        display: 'block',
        maxWidth: 'none',
        wdith: 'auto',
        height: 'auto',
        // transition: 'opacity 0.2s ease',
        opacity: 0,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.width !== this.props.width ||
      nextProps.height !== this.props.height
    ) {
      this.imgOnload();
    }
  }

  imgOnload = () => {
    this.setState(
      {
        imgStyles: {
          display: 'block',
          maxWidth: 'none',
          wdith: 'auto',
          height: 'auto',
          // transition: 'opacity 0.2s ease',
          opacity: 0,
        },
      },
      () => {
        const imgDOM = this.refs.img;
        const { width, height } = this.props;
        const imgWidth = imgDOM.width;
        const imgHeight = imgDOM.height;

        const imgStyles = getStyles(width, height, imgWidth, imgHeight);
        this.setState({
          imgStyles: {
            ...this.state.imgStyles,
            ...imgStyles,
            opacity: 1,
          },
        });
      }
    );
  };

  render() {
    const {
      alt,
      title,
      src,
      width,
      height,
      style = {},
      className,
      onError,
      shape,
      enableAliCDNSuffix,
    } = this.props;

    const styles = {
      ...style,
      display: 'inline-block',
      overflow: 'hidden',
      width,
      height,
    };
    const { imgStyles } = this.state;

    const realSrc = enableAliCDNSuffix
      ? src + aliCDNSuffix({ width, height })
      : src;

    const cls = classnames('ice-img', shape, className);

    return (
      <div className={cls} style={styles}>
        <img
          style={imgStyles}
          onError={onError}
          ref="img"
          src={realSrc}
          alt={alt}
          title={title}
          onLoad={this.imgOnload}
        />
      </div>
    );
  }
}

const getStyles = (wrapWidth, wrapHeight, imgWidth, imgHeight) => {
  // 进行等比运算
  const wrapRatio = wrapWidth / wrapHeight;
  const imgRatio = imgWidth / imgHeight;

  let finalWidth = 0;
  let finalHeight = 0;
  let finalMarginTop = 0;
  let finalMarginLeft = 0;

  if (wrapRatio > imgRatio) {
    // 父框宽度更大，以父框的宽度为准，拉伸图片上移
    finalWidth = wrapWidth;
    finalHeight = finalWidth / imgRatio;
    finalMarginTop = ((finalHeight - wrapHeight) / 2) * -1;
  } else {
    // 父框高度更大，以父框高度为准，拉伸图片左移动
    finalHeight = wrapHeight;
    finalWidth = finalHeight * imgRatio;
    finalMarginLeft = ((finalWidth - wrapWidth) / 2) * -1;
  }

  return {
    height: finalHeight,
    width: finalWidth,
    marginLeft: finalMarginLeft,
    marginTop: finalMarginTop,
  };
};
