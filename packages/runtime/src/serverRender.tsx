import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import type Runtime from './runtime.js';
import App from './App.js';
import AppRoutes from './AppRoutes.js';
import type { AppRouterProps } from './types';

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
    AppRouter = (props: AppRouterProps) => (
      <StaticRouter location={req.url}>
        <AppRoutes PageWrappers={props.PageWrappers} />
      </StaticRouter>
    );
    runtime.setAppRouter(AppRouter);
  }

  const pageHtml = ReactDOMServer.renderToString(
    <App
      runtime={runtime}
    />,
  );

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}
