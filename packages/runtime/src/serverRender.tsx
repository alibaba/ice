import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import { StaticRouter } from 'react-router-dom/server.js';
import type Runtime from './runtime.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';

export default async function serverRender(
  runtime: Runtime,
  requestContext,
  documentOnly: boolean,
) {
  const appContext = runtime.getAppContext();
  const { appConfig, document: Document } = appContext;

  const documentHtml = ReactDOMServer.renderToString(<Document />);

  if (documentOnly) {
    return documentHtml;
  }

  const { strict } = appConfig.app;

  const StrictMode = strict ? React.StrictMode : React.Fragment;
  const AppProvider = runtime.composeAppProvider() || React.Fragment;

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    const { req } = requestContext;
    AppRouter = () =>
      <DefaultAppRouter Router={(props) => <StaticRouter location={req.url}>{props.children}</StaticRouter>} />;
  }

  const PageWrappers = runtime.getWrapperPageRegistration();

  const pageHtml = ReactDOMServer.renderToString(
    <StrictMode>
      <App
        AppProvider={AppProvider}
        AppRouter={AppRouter}
        appContext={appContext}
        PageWrappers={PageWrappers}
      />
    </StrictMode>,
  );

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}
