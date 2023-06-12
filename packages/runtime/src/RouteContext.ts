import { useLoaderData } from 'react-router-dom';
import type { RouteConfig } from './types.js';

function useData<T = any>(): T {
  return (useLoaderData() as any)?.data;
}

function useConfig<T = {}>(): RouteConfig<T> {
  return (useLoaderData() as any)?.pageConfig;
}

export {
  useData,
  useConfig,
};
