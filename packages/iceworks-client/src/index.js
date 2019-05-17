import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import '@alifd/next/reset.scss';

import logger from '@utils/logger';
import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/Locale';
import { ThemeProvider } from '@components/ThemeProvider';
import './global.scss';
import './variables.scss';

const history = createBrowserHistory();

const App = () => {
  useEffect(() => {
    logger.info('App loaded.');
  }, []);

  return (
    <LocaleProvider>
      <ThemeProvider>
        <Router history={history}>
          <Route path="/" component={MainLayout} />
        </Router>
      </ThemeProvider>
    </LocaleProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('iceworks'));
