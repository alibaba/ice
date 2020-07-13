import * as React from 'react';

const module = ({ addProvider, appConfig }) => {
  if (appConfig.app && appConfig.app.addProvider) {
    addProvider(appConfig.app.addProvider);
  }
};

export default module;
