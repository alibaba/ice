import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { isInIcestark } from '@ice/stark-app';
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    fallback: <div>加载中...</div>,
    type: 'browser'
  },
  logger: {
    level: 'warn'
  },
  icestark: {
    type: 'child'
  },
};

if (!isInIcestark()) {
  runApp(appConfig);
}

export function mount () {
  runApp(appConfig);
}

export function unmount(props) {
  ReactDOM.unmountComponentAtNode(props.container);
}