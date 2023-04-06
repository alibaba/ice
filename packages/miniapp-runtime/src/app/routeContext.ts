import * as React from 'react';

const DataContext = React.createContext(undefined);
DataContext.displayName = 'Data';

function useData<T = any>(): T {
  const value = React.useContext(DataContext);
  return value;
}
const DataProvider = DataContext.Provider;

const ConfigContext = React.createContext(undefined);
ConfigContext.displayName = 'Config';

function useConfig<T = {}>(): T {
  const value = React.useContext(ConfigContext);
  return value;
}
const ConfigProvider = ConfigContext.Provider;

export {
  useData,
  DataProvider,
  useConfig,
  ConfigProvider,
};
