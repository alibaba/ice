import React from 'react';
import { Dialog } from '@icedesign/base';
import ansiHTML from 'ansi-html';

/**
 * 全局提示模块
 */

const notify = ({ title = '错误信息', error = {}, message ='' }) => {
  let msg = '';
  let stackMessage = '';
  if (typeof error === 'string') {
    msg = error;
  } else {
    const { metadata = {}, stack } = error;
    stackMessage = stack;
    msg = metadata.message || error.message || '';
  }
  let stackHtml = '';
  const str = ansiHTML(msg.replace(/\n/g, '<br>'));
  if (stackMessage) {
    stackHtml = ansiHTML(stackMessage.replace(/\n/g, '<br>'));
  }
  if (message) {
    message = message + '<br/>';
  }

  Dialog.alert({
    className: 'notice-dialog',
    needWrapper: false,
    content: (
      <div
        style={{
          backgroundImage: 'linear-gradient(#21221d 50%, #272822 50%)',
          backgroundOrigin: 'content-box',
          backgroundSize: '40px 40px',
          color: '#E5E5C2',
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          fontSize: 12,
          lineHeight: '20px',
          margin: 0,
          padding: '5px',
          userSelect: 'text',
          whiteSpace: 'pre-wrap',
          width: '500px',
          overflow: 'auto',
        }}
        dangerouslySetInnerHTML={{ __html: message + str + '<br/>' + stackHtml }}
      />
    ),
    title: title,
  });
};

export default notify;
