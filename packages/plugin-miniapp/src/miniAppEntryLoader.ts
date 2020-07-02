import * as babel from '@babel/core';
import { getBabelConfig } from 'build-scripts-config';

const babelConfig = getBabelConfig();

module.exports = function() {
  // Avoid path error in Windows
  const resourcePath = this.resourcePath.replace(/\\/g, '/');

  const source = `
    import React from 'react';
    import ReactDOM from 'react-dom';
    import Component from '${resourcePath}';

    const container = document.createElement('div');
    container.id = 'iceapp';
    document.body.appendChild(container);
    const mountNode = document.getElementById('iceapp');

    export default function createApp() {
      ReactDOM.render(<Component />, mountNode);
    }
  `;
  const { code } = babel.transformSync(source, {
    filename: 'example.js',
    ...babelConfig
  });

  return code;
};
