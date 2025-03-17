import { Meta, Title, Links, Main, Scripts } from 'ice';

function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE 3.0 Demo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: "window.addEventListener('ice-suspense', (e) => console.log('ice-suspense', e));",
          }}
        />
        <Scripts async />
      </body>
    </html>
  );
}

export default Document;
