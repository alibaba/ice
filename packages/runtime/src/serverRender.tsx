import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import type Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppRouterProps } from './types';
import { DocumentContextProvider } from './DocumentContext.js';
import { getPageConfig } from './pageConfig.js';
import { getPageAssets } from './pageAssets.js';

export default async function serverRender(
  runtime: Runtime,
  requestContext,
  Document,
  documentOnly: boolean,
) {
  const appContext = runtime.getAppContext();
  const { matches, routeData, assetsManifest } = appContext;

  let html = '';

  if (!documentOnly) {
    html = renderApp(requestContext, runtime);
  }

  const pageConfig = getPageConfig(matches, routeData);
  const pageAssets = getPageAssets(matches, assetsManifest);
  const entryAssets = getEntryAssets(assetsManifest);

  const documentContext = {
    publicPath: assetsManifest.publicPath,
    pageConfig,
    pageAssets,
    entryAssets,
    html,
  };

  const result = ReactDOMServer.renderToString(
    <DocumentContextProvider value={documentContext}>
      <Document />
    </DocumentContextProvider>,
  );

  return result;
}

function renderApp(requestContext, runtime) {
  let AppRouter = runtime.getAppRouter();

  if (!AppRouter) {
    const { req } = requestContext;
    AppRouter = (props: AppRouterProps) => (
      <StaticRouter location={req.url}>
        <AppRoutes PageWrappers={props.PageWrappers} />
      </StaticRouter>
    );
    runtime.setAppRouter(AppRouter);
  }

  const html = ReactDOMServer.renderToString(
    <App runtime={runtime} />,
  );

  return html;
}

function getEntryAssets(assetsManifest) {
  const { bundles } = assetsManifest;
  return bundles['main'];
}