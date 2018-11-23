import React from 'react';
import { Dialog } from '@icedesign/base';
import ansiHTML from 'ansi-html';

/**
 * 用于全局展示错误
 */

const notify = (title = '错误提示', error, done) => {
  function ok() {
    if (typeof done === 'function') done();
  }

  let message;
  let stack;
  let metadata;

  let metadataMessage = '';
  let str = '';
  let stackHtml = '';

  if (typeof error == 'string') {
    message = error;
  } else {
    message = error.message;
    stack = error.stack;
    metadata = error.metadata;

    if (metadata) {
      stack = metadata.stack;
      metadataMessage = metadata.message || '';
      str = ansiHTML(metadataMessage.replace(/\n/g, '<br>'));
    }
  }

  if (stack) {
    stackHtml = ansiHTML(stack.replace(/\n/g, '<br>'));
  }
  const strHtml = `${str}${str ? '<br/>' : ''}${stackHtml}`;

  Dialog.alert({
    className: 'notice-dialog',
    needWrapper: false,
    hasMask: true,
    onOk: ok,
    onClose: ok,
    content: (
      <div>
        <div
          style={{
            color: '#666',
            fontFamily: 'Consolas, Monaco, "Andale Mono", monospace',
            fontSize: 12,
            lineHeight: '20px',
            margin: 15,
            userSelect: 'text',
            width: '80vw',
            overflow: 'auto',
          }}
        >
          {message}
        </div>
        {strHtml && (
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
              width: 'auto',
              maxHeight: 400,
              overflow: 'auto',
            }}
            dangerouslySetInnerHTML={{ __html: strHtml }}
          />
        )}
      </div>
    ),
    title: title,
  });
};

export default notify;
