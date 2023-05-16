import { Meta, Title, Links, Main, Scripts, useScripts } from 'ice';

function Document() {
  const scripts = useScripts();
  console.log(scripts);

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
        <Scripts async />
      </body>
    </html>
  );
}

export default Document;
