const express = require('express');
const fs = require('fs');
const path = require('path');
const { createServer: createViteServer } = require('vite');
  
const resolve = (p) => path.resolve(__dirname, p);

async function createServer() {
  const root = process.cwd();

  const app = express();

  const vite = await createViteServer({
    root,
    server: {
      middlewareMode: 'ssr',
      watch: {
        usePolling: true,
        interval: 100
      }
    },
    // ssr: {
      // external: ['prop-types', 'path-to-regexp', 'react-is']
    // }
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    const url = req.originalUrl;
    let template = fs.readFileSync(resolve('public/index.html'), 'utf-8');
    template = await vite.transformIndexHtml(url, template);
    const render = 
    (await vite.ssrLoadModule('./.ice/plugins/ssr/server.tsx')).render;
    const context = {};
    const appHtml = render(url, context);

    const html = template.replace('<!--app-html-->', appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  });

  return { app, vite };
}

createServer().then(({ app }) => {
  app.listen(4000, () => {
    console.log('http://localhost:4000');
  });
});