import { Meta, Title, Links, Main, Scripts, useAppData, defineDataLoader, unstable_useDocumentData } from 'ice';
import type { AppData } from '@/types';

export const dataLoader = defineDataLoader(() => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        title: 'documentData',
      });
      // ATTENTION: This async call will pause rendering document.
    }, 1000);
  });
});

function Document() {
  const appData = useAppData<AppData>();
  // Get document data when fallback to document only.
  const documentData = unstable_useDocumentData();

  console.log('document data', documentData);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
        <script
          dangerouslySetInnerHTML={{
            __html: `console.log('${appData?.title}')`,
          }}
        />
      </head>
      <body>
        <Main />
        <div>
          <h1>Document Data</h1>
          <code>
            <pre>{JSON.stringify(documentData, null, 2)}</pre>
          </code>
        </div>
        <Scripts />
      </body>
    </html>
  );
}

export default Document;
