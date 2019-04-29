import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@utils/logger';
import '@alifd/next/reset.scss';

import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/Locale';
import { ThemeProvider } from '@components/ThemeProvider';
import { SocketProvider } from '@hooks/useSocket';
import appConfig from './appConfig';

import './global.scss';
import './variables.scss';

const URL = appConfig.socketUrl;

const App = () => {
  return (
    <SocketProvider url={URL}>
      <LocaleProvider>
        <ThemeProvider>
          <Router>
            <Route path="/" component={MainLayout} />
          </Router>
        </ThemeProvider>
      </LocaleProvider>
    </SocketProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('iceworks'));
