'use client';

import { DocumentClientBody, DocumentClientHead } from './documentClient';
// import RscServerRouter from './rscServerRouter';

// import { Meta, Title, Links, Main, Scripts } from 'ice';

function Document(props) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <DocumentClientHead />
      </head>
      <body>
        <DocumentClientBody />
      </body>
    </html>
    // <>
    //   <DocumentClientHead />
    //   <DocumentClientBody />
    // </>
  );
}

export default Document;
