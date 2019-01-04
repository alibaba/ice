
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Balloon } from '@alifd/next';

import QrCodeIcon from './QrCodeIcon';
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
    left: 'l',
    right: 'r',
    top: 't',
    bottom: 'b',
  };

  render() {
    const { align, className = '', style = {}, trigger, triggerSize, triggerStyle, ...other } = this.props;

    const content = <Panel {...other} />;
    const clazz = classnames(className, 'ice-qrcode');
    const triggerClazz = classnames('ice-qrcode-trigger', {
      [`ice-qrcode-trigger-size-${triggerSize}`]: !!triggerSize
    });
    return (
      <div className={clazz} style={style}>
        <Balloon
          align={this.alignMap[align] || this.alignMap.left}
          closable={false}
          alignEdge
          trigger={
            trigger || (<QrCodeIcon className={triggerClazz} style={triggerStyle} />)
          }
          triggerType="hover"
        >
          {content}
        </Balloon>
      </div>
    );
  }
}
