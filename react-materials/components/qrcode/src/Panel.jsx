import PropTypes from 'prop-types';
import React, { Component, isValidElement } from 'react';

import QRCode from 'qrcode.react';

export default class IceQrcodePanel extends Component {
  static propTypes = {
    /**
     * 二维码的展示内容
     */
    value: PropTypes.string.isRequired,
    /**
     * 二维码下方文案
     */
    text: PropTypes.node,
    /**
     * 二维码展示位置
     */
    align: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /**
     * 二维码背景色
     */
    bgColor: PropTypes.string,
    /**
     * 二维码前景色
     */
    fgColor: PropTypes.string,
    /**
     * 二维码的纠错等级
     */
    level: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
    /**
     * 二维码尺寸
     */
    size: PropTypes.number,
  };

  static defaultProps = {
    text: null,
    value: null,
    size: 128,
    bgColor: '#ffffff',
    fgColor: '#000000',
    level: 'L',
  };

  render() {
    let { text, className = '', style = {}, ...other } = this.props;

    // object
    return (
      <div
        className={className}
        style={{
          display: 'inline-block',
          textAlign: 'center',
          ...style,
        }}
      >
        <div style={{ lineHeight: 0 }}>
          <QRCode {...other} />
        </div>
        {typeof text === 'string' && (
          <span
            style={{
              lineHeight: 1.6,
              paddingTop: '4px',
              fontSize: '12px',
              display: 'block',
              color: '#666',
            }}
          >
            {text}
          </span>
        )}
        {isValidElement(text) && text}
      </div>
    );
  }
}
