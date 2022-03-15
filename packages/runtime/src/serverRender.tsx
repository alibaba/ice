import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import type Runtime from './runtime.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';

export default async function serverRender(
  runtime: Runtime,
  requestContext,
  Document,
  documentOnly: boolean,
) {
  const documentHtml = ReactDOMServer.renderToString(<Document />);

  if (documentOnly) {
    return documentHtml;
  }

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const { req } = requestContext;
    runtime.setAppRouter(() => <DefaultAppRouter Router={StaticRouter} routerProps={{ location: req.url }} />);
  }

  const pageHtml = ReactDOMServer.renderToString(
    <App
      runtime={runtime}
    />,
  );

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}
