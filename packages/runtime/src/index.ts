import {
  Link,
  Outlet,
} from 'react-router-dom';
import Runtime from './runtime.js';
import App from './App.js';
import runClientApp from './runClientApp.js';
import runServerApp, { renderDocument } from './runServerApp.js';
import { useAppContext } from './AppContext.js';
import {
  Meta,
  Title,
  Links,
  Scripts,
  Main,
} from './Document.js';
import {
  RuntimePlugin,
  AppContext,
  AppConfig,
  PageWrapper,
  RouteItem,
} from './types.js';
import defineAppConfig from './defineAppConfig.js';
import { matchRoutes } from './routes.js';

export {
  matchRoutes,
  Runtime,
  App,
  runClientApp,
  runServerApp,
  renderDocument,
  useAppContext,
  Link,
  Outlet,
  Meta,
  Title,
  Links,
  Scripts,
  Main,
  defineAppConfig,
  // types
  RuntimePlugin,
  AppContext,
  AppConfig,
  PageWrapper,
  RouteItem,
};