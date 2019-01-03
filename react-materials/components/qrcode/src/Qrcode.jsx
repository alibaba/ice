import { Balloon } from '@alifd/next';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import QrCodeImage from '../img/qr_code.svg';
import Panel from './Panel';

export default class IceQrcode extends Component {
  static displayName = 'IceQrcode';

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
     * 触发器 icon 的大小
     */
    triggerSize: PropTypes.oneOf([
      'xxs',
      'xs',
      'small',
      'medium',
      'large',
      'xl',
      'xxl',
    ]),
    /**
     * 触发器 icon 的 inline-style
     */
    triggerStyle: PropTypes.object,
    /**
     * 触发器的触发节点
     */
    trigger: PropTypes.node,
  };

  static defaultProps = {
    triggerSize: 'medium',
    triggerStyle: {},
    align: 'left',
  };

  alignMap = {
    left: 'lb',
    right: 'rb',
    top: 't',
    bottom: 'b',
  };

  render() {
    const { align, className = '', style = {}, trigger, ...other } = this.props;

    const content = <Panel {...other} />;

    return (
      <span className={className} style={{ color: '#333', ...style }}>
        <Balloon
          align={this.alignMap[align] || 'lb'}
          closable={false}
          overlay={content}
          trigger={
            trigger || (<img src={QrCodeImage} />)
          }
          triggerType="hover"
        >
          {content}
        </Balloon>
      </span>
    );
  }
}
