/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Meta, Links, Root, Scripts } from 'ice';

function Document() {
  return (
    <html lang="en">
      <head>
        <title>ICE Demo</title>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Root />
        <Scripts />
      </body>
    </html>
  );
}

export default Document;