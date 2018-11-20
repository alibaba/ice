import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import aliCDNSuffix from './aliCDNSuffix';

export default class Contain extends Component {
  static displayName = 'Contain';

  static propTypes = {
    src: PropTypes.string.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    alt: PropTypes.string,
    onError: PropTypes.func,
    style: PropTypes.object,
    shape: PropTypes.string,
  };

  static defaultProps = {
    onError: () => {},
    alt: '',
  };

  state = {};

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
      width,
      height,
      overflow: 'hidden',
    };

    const centerStyles = {
      width,
      height,
      display: 'table-cell',
      verticalAlign: 'middle',
      textAlign: 'center',
    };

    const imgStyles = {
      width: 'auto',
      height: 'auto',
      maxWidth: width,
      maxHeight: height,
    };

    const realSrc = enableAliCDNSuffix
      ? src + aliCDNSuffix({ width, height })
      : src;

    const cls = classnames('ice-img', shape, className);

    return (
      <div className={cls} style={styles}>
        <div style={centerStyles}>
          <img
            style={imgStyles}
            onError={onError}
            ref="img"
            src={realSrc}
            alt={alt}
            title={title}
          />
        </div>
      </div>
    );
  }
}
