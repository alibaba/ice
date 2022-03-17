import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import type Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppRouterProps } from './types';
import { DocumentContextProvider } from './DocumentContext.js';

export default async function serverRender(
  runtime: Runtime,
  requestContext,
  Document,
  documentOnly: boolean,
) {
  const appContext = runtime.getAppContext();
  const { routeData, matches } = appContext;

  let html = '';

  if (!documentOnly) {
    html = renderApp(requestContext, runtime);
  }

  const documentContext = {
    matches,
    routeData,
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

  const pageHtml = ReactDOMServer.renderToString(
    <App runtime={runtime} />,
  );

  return pageHtml;
}