import { Meta, Title, Links, Main, Scripts, useAppData } from 'ice';
import type { AppData } from '@/types';

function Document() {
  const appData = useAppData<AppData>();

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
        <Scripts />
      </body>
    </html>
  );
}

export default Document;
