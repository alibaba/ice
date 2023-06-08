import { useLoaderData } from 'react-router-dom';
import type { RouteConfig } from './types.js';

function useData<T = any>(): T {
  return process.env.ICE_CORE_ROUTER === 'true' || import.meta.renderer !== 'client'
  // eslint-disable-next-line react-hooks/rules-of-hooks
    ? (useLoaderData() as any)?.data : undefined;
}

function useConfig<T = {}>(): RouteConfig<T> {
  return process.env.ICE_CORE_ROUTER === 'true' || import.meta.renderer !== 'client'
  // eslint-disable-next-line react-hooks/rules-of-hooks
    ? (useLoaderData() as any)?.pageConfig : undefined;
}

export {
  useData,
  useConfig,
};
