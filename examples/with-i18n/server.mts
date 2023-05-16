import express from 'express';
import { renderToHTML } from './build/server/index.mjs';

const app = express();
const port = 4000;
const basename = '/app';

app.use(express.static('build', {}));

app.use(async (req, res) => {
  const { statusCode, statusText, headers, value: body } = await renderToHTML({ req, res }, { basename });
  res.statusCode = statusCode;
  res.statusMessage = statusText;
  Object.entries((headers || {}) as Record<string, string>).forEach(([name, value]) => {
    res.setHeader(name, value);
  });
  if (body && req.method !== 'HEAD') {
    res.end(body);
  } else {
    res.end();
  }
});


app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}${basename}`);
});