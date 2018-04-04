---
title: 示例图标
order: 2
importStyle: true
---

展示更多的用法

````jsx
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Feedback } from '@icedesign/base';
import DynamicIcon from 'dynamic-icon';

const CustomIcon = DynamicIcon.create({
  fontFamily: 'iceicon2',
  prefix: 'ice-icon-stable',
  css: 'https://at.alicdn.com/t/font_107674_7dns782b1jsb57b9.css'
});

const all = [
  'bangzhu',
  'cascades',
  'home2',
  'activity',
  'qrcode',
  'light',
  'link',
  'copy',
  'creative',
  'phone',
  'angle-down',
  'edit',
  'hourglass',
  'coupons',
  'repair',
  'shopcar',
  'cross',
  'clock',
  'search',
  'message',
  'exchange',
  'delete',
  'angle-up',
  'redpacket',
  'speaker',
  'transfer-left',
  'transfer-right',
  'customize',
  'down',
  'publish',
  'attachment',
  'eye',
  'location',
  'backward',
  'forward',
  'rmb',
  'notice',
  'yonghu',
  'shop',
  'fans2',
  'chart',
  'lock',
  'code',
  'horn',
  'home',
  'bell',
  'person',
  'bold',
  'background-color',
  'font-color',
  'underline',
  'italics',
  'font-size',
  'ol-list',
  'align-center',
  'align-flex',
  'float-full',
  'float-left',
  'quote',
  'align-right',
  'align-left',
  'ul-list',
  'store',
  'topic',
  'anchor',
  'video',
  'sucai',
  'picture',
  'gif',
  'task',
  'guanbi',
  'question',
  'mail',
  'image',
  'question2',
  'key',
  'content',
  'edit2',
  'menu',
  'collapse',
  'correct',
  'directory',
  'fans',
  'compass',
  'quote2',
  'gif2',
  'pin',
  'video2',
  'item',
  'material',
  'shezhi',
  'skin_light',
  'requ'
];

class App extends Component {
  copied = () => {
    Feedback.toast.success('复制成功！');
  };

  renderIcon = (type, idx) => {
    return (
      <div
        style={{
          display: 'inline-block',
          minWidth: '150px',
          marginBottom: '15px',
          cursor: 'pointer'
        }}
        key={idx}
      >
        <CustomIcon size="large" type={type} />
        <CopyToClipboard text={type} onCopy={this.copied}>
          <span style={{ marginLeft: '5px' }}>{type}</span>
        </CopyToClipboard>
      </div>
    );
  };

  render() {
    return <div>{all.map(this.renderIcon)}</div>;
  }
}

ReactDOM.render(<App />, mountNode);
````
