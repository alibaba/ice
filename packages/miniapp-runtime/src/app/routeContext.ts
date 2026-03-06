import * as React from 'react';

const DataContext = React.createContext(undefined);
DataContext.displayName = 'Data';

function useData<T = any>(): T {
  const value = React.useContext(DataContext);
  return value;
}
// TODO: React 19 支持直接使用 <Context> 替代 <Context.Provider>，当不再需要兼容 React 18 时可简化
const DataProvider = DataContext.Provider;

const ConfigContext = React.createContext(undefined);
ConfigContext.displayName = 'Config';

function useConfig<T = {}>(): T {
  const value = React.useContext(ConfigContext);
  return value;
}
// TODO: React 19 支持直接使用 <Context> 替代 <Context.Provider>，当不再需要兼容 React 18 时可简化
const ConfigProvider = ConfigContext.Provider;

export {
  useData,
  DataProvider,
  useConfig,
  ConfigProvider,
};
