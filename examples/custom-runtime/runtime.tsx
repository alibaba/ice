import React from 'react';
import type { RunClientAppOptions } from '@ice/runtime-kit';
import { getAppConfig } from '@ice/runtime-kit';

import ReactDOM from 'react-dom';

const runClientApp = (options: RunClientAppOptions) => {
  console.log('runClientApp', options);
  ReactDOM.render(<div>Hello World</div>, document.getElementById('ice-container'));
};

export {
  getAppConfig,
  runClientApp,
};
