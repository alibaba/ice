import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import type Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppRouterProps } from './types';
import { DocumentContextProvider } from './DocumentContext.js';
import { mergePageConfig } from './pageConfig.js';
import { mergePageAssets } from './pageAssets.js';

export default async function serverRender(
  runtime: Runtime,
  requestContext,
  Document,
  documentOnly: boolean,
) {
  const appContext = runtime.getAppContext();
  const { matches, routeData, routeAssets } = appContext;

  let html = '';

  if (!documentOnly) {
    html = renderApp(requestContext, runtime);
  }

  const pageConfig = mergePageConfig(matches, routeData);
  const pageAssets = mergePageAssets(matches, routeAssets);

  const documentContext = {
    pageConfig,
    pageAssets,
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
