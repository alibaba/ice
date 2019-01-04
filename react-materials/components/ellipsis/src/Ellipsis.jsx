'use strict';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Balloon } from '@alifd/next';
import { getWidthFromDOM } from './utils';

const { Tooltip } = Balloon;

export default class IceEllipsis extends Component {
  static displayName = 'IceEllipsis';

  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    /**
     * 渲染几行文本
     */
    lineLimit: PropTypes.number,
    /**
     * 是否显示额外的 tool tip 展示全部内容
     */
    showTooltip: PropTypes.bool,
    /**
     * 实际文本内容
     */
    text: PropTypes.string,
    /**
     * 针对 tooltip 模式下，Tooltip 组件的自定义 props
     */
    tooltipProps: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    lineLimit: 1,
    showTooltip: false,
    // 设置内容
    text: '',
    tooltipProps: {},
  };

  constructor(props) {
    super(props);

    let isSupportLineClamp = true;
    const node = document.createElement('div');

    if ('WebkitLineClamp' in node.style) {
      node.style['WebkitLineClamp'] = 3;
      if (node.style['WebkitLineClamp'] != 3) {
        isSupportLineClamp = false;
      }
    } else {
      isSupportLineClamp = false;
    }

    this.state = {
      isSupportLineClamp,
      wrapWidth: 'auto',
      fontSize: 16,
    };
  }

  componentDidMount() {
    let wrapDOM = ReactDOM.findDOMNode(this).parentNode;
    let wrapWidth = getWidthFromDOM(wrapDOM);
    // 拿到父结构的 font-size 用于自动计算宽度
    let fontSize = parseInt(
      window.getComputedStyle(wrapDOM, null).getPropertyValue('font-size')
    );

    this.setState({
      wrapWidth: wrapWidth,
      fontSize: fontSize,
    });
  }

  render() {
    let content = null;
    let { lineLimit, text, ...others } = this.props;

    const cls = classnames({
      ['ice-ellipsis']: true,
      [this.props.className]: this.props.className,
    });
    const style = {
      ...this.props.style,
    };

    const { wrapWidth, isSupportLineClamp, fontSize } = this.state;

    if (lineLimit === 1) {
      content = (
        <span
          className={cls}
          style={{
            width: wrapWidth,
            textOverflow: 'ellipsis',
            display: 'inline-block',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            ...style,
          }}
        >
          {text}
        </span>
      );
    } else if (lineLimit > 1) {
      if (this.state.isSupportLineClamp) {
        content = (
          <span
            className={cls}
            style={{
              width: wrapWidth,
              textOverflow: 'ellipsis',
              display: 'inline-block',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: lineLimit,
              WebkitBoxOrient: 'vertical',
              ...style,
            }}
          >
            {text}
          </span>
        );
      } else {
        let lineCount = 10;
        if (wrapWidth !== 'auto') {
          lineCount = parseFloat(wrapWidth / fontSize, 10);
        }
        lineCount = Math.floor(lineCount);

        let textArr = getTextArr(text, lineCount, lineLimit);

        const textList = textArr.map((item, index) => {
          // 最后一个超过一行长度的裁切一下加下省略号
          if (index == lineLimit - 1 && item.length === lineCount) {
            return <span key={index}>{setEllipsis(item)}</span>;
          }

          return <span key={index}>{item}</span>;
        });

        content = (
          <span
            className={cls}
            style={{
              width: wrapWidth,
              ...style,
            }}
          >
            {textList}
          </span>
        );
      }
    }

    if (this.props.showTooltip) {
      return (
        <Tooltip
          trigger={content}
          align="b"
          {...this.props.tooltipProps}>
          {text}
        </Tooltip>
      );
    } else {
      return <span title={text}>{content}</span>;
    }
  }
}

function getTextArr(text, lineTextLength, lineLimit) {
  let result = [];

  for (let i = 1; i <= Math.ceil(text.length / lineTextLength); i++) {
    const start = lineTextLength * (i - 1);
    const end = Math.min(i * lineTextLength, text.length);
    const currentStr = text.substring(start, end);
    result.push(currentStr);
  }

  if (result.length > lineLimit) {
    result.splice(lineLimit);
  }

  return result;
}
function setEllipsis(text) {
  let textArr = text.split('');
  textArr.splice(textArr.length - 1, 3, '...');
  return textArr.join('');
}
