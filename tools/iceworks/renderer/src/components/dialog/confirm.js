import React from 'react';
import { Dialog } from '@icedesign/base';

/**
 * 全局提示模块
 */

const confirm = ({ title, content, fullWidth = false }, done) => {
  function ok() {
    if (typeof done === 'function') done(true);
  }
  function cancel() {
    if (typeof done === 'function') done(false);
  }
  if (!title || !content) {
    throw new Error('title & content 字段必填');
  }
  Dialog.confirm({
    className: 'notice-dialog',
    needWrapper: false,
    hasMask: true,
    onOk: ok,
    onCancel: cancel,
    onClose: cancel,
    content: (
      <div
        style={{
          color: '#666',
          fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
          fontSize: 12,
          lineHeight: '20px',
          margin: 15,
          userSelect: 'text',
          width: fullWidth ? '80vw' : 500,
          overflow: 'auto',
        }}
      >
        {content}
      </div>
    ),
    title: title,
  });
};

export default confirm;
