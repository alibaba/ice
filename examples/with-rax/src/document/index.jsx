import { createElement } from 'rax';
import { Root, Style, Script, Data } from 'rax-document';

function Document(props) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no,viewport-fit=cover" />
        <title>@ali/demo-app</title>
        <Style />
      </head>
      <body>
        {/* root container */}
        <Root />
        <Data />
        <Script />
      </body>
    </html>
  );
}
export default Document;
