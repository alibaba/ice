// import { runApp, IAppConfig } from 'ice';
import './global.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/index';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('ice-container'),
);

// const appConfig = {
//   app: {
//     rootId: 'ice-container'
//   }
// }

// runApp(appConfig)