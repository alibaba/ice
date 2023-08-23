// import { DocumentClientBody, DocumentClientHead } from './documentClient';
import { Meta, Title, Links, Main, Scripts } from 'ice';
// import RscServerRouter from './rscServerRouter';

// import { Meta, Title, Links, Main, Scripts } from 'ice';

function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <DocumentClientHead /> */}
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        {/* <DocumentClientBody /> */}
        <Main />
        <Scripts />
      </body>
    </html>
    // <>
    //   <DocumentClientHead />
    //   <DocumentClientBody />
    // </>
  );
}

export default Document;
