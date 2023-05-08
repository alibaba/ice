import path from 'path';
import { fileURLToPath } from 'url';
import { Meta, Title, Links, Main, Scripts } from 'ice';
import fse from 'fs-extra';

let dirname;
if (typeof __dirname === 'string') {
  dirname = __dirname;
} else {
  dirname = path.dirname(fileURLToPath(import.meta.url));
}

function Document() {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="description" content="ICE Demo" />
        <meta name="sourcemap" data-extra-line="111" data-extra-column="111" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Title />
        <Links />
      </head>
      <body>
        <Main />
        <Scripts ScriptElement={(props) => {
          if (props.src && !props.src.startsWith('http')) {
            const filePath = path.join(dirname, `..${props.src}`);
            const sourceMapFilePath = path.join(dirname, `..${props.src}.map`);
            const res = fse.readFileSync(filePath, 'utf-8');
            return <script data-sourcemap={sourceMapFilePath} dangerouslySetInnerHTML={{ __html: res }} {...props} />;
          } else {
            return <script {...props} />;
          }
        }}
        />
      </body>
    </html>
  );
}

export default Document;
