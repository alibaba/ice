import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import MainLayout from '@layouts/MainLayout/index';
import LocaleProvider from '@components/LocaleProvider';
import { ThemeProvider } from '@components/ThemeProvider';
import { getLocale } from '@utils/locale';
import { StoreContext } from '@store';

import '@utils/logger';
import '@alifd/next/reset.scss';
import './global.scss';
import './variables.scss';

const locale = getLocale();

const App = () => {
  const [data, setData] = useState();

  return (
    <StoreContext.Provider value={[data, setData]}>
      <LocaleProvider locale={locale}>
        <ThemeProvider>
          <Router>
            <Route path="/" component={MainLayout} />
          </Router>
        </ThemeProvider>
      </LocaleProvider>
    </StoreContext.Provider>
  );
};

const ICE_CONTAINER = document.getElementById('iceworks');

ReactDOM.render(<App />, ICE_CONTAINER);
