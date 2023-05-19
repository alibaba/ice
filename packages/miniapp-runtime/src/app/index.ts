import { getAppConfig, defineAppConfig, useAppData, defineDataLoader } from '@ice/runtime';
import runClientApp from './runClientApp.js';
import Link from './Link.js';
import useSearchParams from './useSearchParams.js';
import { routerHistory as history } from './history.js';
import usePageLifecycle from './usePageLifecycle.js';
import { useData, useConfig } from './routeContext.js';
import { withSuspense, useSuspenseData } from './suspense.js';

export {
  runClientApp,
  getAppConfig,
  defineAppConfig,
  useAppData,
  useData,
  useConfig,
  Link,
  useSearchParams,
  history,
  defineDataLoader,
  usePageLifecycle,
  withSuspense,
  useSuspenseData,
};
