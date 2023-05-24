import { useLoaderData } from 'react-router-dom';
import type { RouteConfig } from './types.js';

function useData<T = any>(): T {
  const data = useLoaderData();
  return (data as any)?.data;
}

function useConfig<T = {}>(): RouteConfig<T> {
  const data = useLoaderData();
  return (data as any)?.pageConfig;
}

export {
  useData,
  useConfig,
};
