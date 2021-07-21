import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
// import { runApp, IAppConfig } from 'ice';

import App from './Home';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // eslint-disable-next-line no-undef
  document.getElementById('ice-container'),
);
