import React from 'react';
import { Dialog } from '@icedesign/base';

/**
 * 全局提示模块
 */

const notify = (
  {
    title = '错误信息',
    content = 'OMG, 发生了未知错误！',
    fullWidth = false,
    error,
  },
  done
) => {
  function ok() {
    if (typeof done === 'function') done();
  }
  if (error) {
    console.error(error);
  }
  Dialog.alert({
    className: 'notice-dialog',
    needWrapper: false,
    hasMask: true,
    onOk: ok,
    onClose: ok,
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

export default notify;
