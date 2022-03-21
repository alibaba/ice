/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Meta, Title, Links, Root, Scripts } from 'ice';

function Document() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: '<!--app-html-->' }}></div>
        <script src="./main.js"></script>
      </body>
    </html>
  );
}

export default Document;