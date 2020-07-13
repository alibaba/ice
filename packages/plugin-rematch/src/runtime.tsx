import * as React from 'react';
import { Provider } from 'react-redux';
import { init } from '@rematch/core';
import { stores } from '$ice/store';

export default ({ addProvider, appConfig }) => {
  if (Object.keys(stores).length === 0) {
    return;
  }

  const { rematch = {} } = appConfig;

  // TODO: initialState 的传入根据 ssr 的实现可能要调整下
  const store = init({
    models: stores,
    ...rematch,
  });

  const StoreProvider = ({children}) => {
    return <Provider store={store}>{children}</Provider>;
  };
  addProvider(StoreProvider);
};
