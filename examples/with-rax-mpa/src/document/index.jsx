import { createElement } from 'rax';
import { Root, Style, Script, Data, App } from 'rax-document';
import appJSON from '../app.json';

function Document(props) {
  return (
    <App config={appJSON}>
      {(pageInfo) => (
        <html>
          <head>
            <meta charset="utf-8" />
            <meta
              name="viewport"
              content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover"
            />
            <title>{ pageInfo.window && pageInfo.window.title || 'title' }</title>
            <Style />
          </head>
          <body>
            {/* root container */}
            <Root />
            <Data />
            <Script />
          </body>
        </html>
      )}
    </App>
  );
}
export default Document;
