import * as React from 'react';
import { useLoaderData } from 'react-router-dom';
import type { RouteData, RouteConfig } from './types.js';

const DataContext = React.createContext<RouteData | undefined>(undefined);
DataContext.displayName = 'Data';

function useData<T = any>(): T {
  const data = useLoaderData();
  return (data as any).data;
}
const DataProvider = DataContext.Provider;

const ConfigContext = React.createContext<RouteConfig<any> | undefined>(undefined);
ConfigContext.displayName = 'Config';

function useConfig<T = {}>(): RouteConfig<T> {
  const data = useLoaderData();
  return (data as any).pageConfig;
}
const ConfigProvider = ConfigContext.Provider;

export {
  useData,
  DataProvider,
  useConfig,
  ConfigProvider,
};
