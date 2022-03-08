import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';
import App from './App.js';
import DefaultAppRouter from './AppRouter.js';

export default async function render(runtime, requestContext) {
  const appContext = runtime.getAppContext();
  const {
    appConfig,
    document: Document,
  } = appContext;

  const documentHtml = ReactDOMServer.renderToString(<Document />);

  const { strict } = appConfig.app;

  const StrictMode = strict ? React.StrictMode : React.Fragment;
  const AppProvider = runtime.composeAppProvider() || React.Fragment;

  let AppRouter = runtime.getAppRouter();
  if (!AppRouter) {
    AppRouter = DefaultAppRouter;
  }

  const pageHtml = ReactDOMServer.renderToString(
    <StrictMode>
      <App
        AppProvider={AppProvider}
        AppRouter={AppRouter}
        appContext={appContext}
      />
    </StrictMode>,
  );

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}