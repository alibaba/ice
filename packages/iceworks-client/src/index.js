import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '@utils/logger';
import '@alifd/next/reset.scss';

import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/Locale';
import { ThemeProvider } from '@components/ThemeProvider';
import { SocketProvider } from '@hooks/useSocket';
import stores from '@stores';
import appConfig from './appConfig';

import './global.scss';
import './variables.scss';

const URL = appConfig.socketUrl;

const App = () => {
  const [projects, project] = stores.userStores(['projects', 'project']);

  useEffect(() => {
    project.refresh();
    projects.refresh();
  }, []);

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
