import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server.js';

export default async function render(requestContext, runtime, Document) {
  const documentHtml = ReactDOMServer.renderToString(<Document />);

  const AppProvider = runtime.composeAppProvider();
  const AppComponent = runtime.getAppComponent();

  const AppWrapper = () => {
    return AppProvider ? (
      <AppProvider>
        { AppComponent }
      </AppProvider>
    ) : AppComponent;
  };

  const pageHtml = ReactDOMServer.renderToString(<AppWrapper />);

  const html = documentHtml.replace('<!--app-html-->', pageHtml);

  return html;
}