import type { ViteDevServer, Plugin, ResolvedConfig } from 'vite';
import { template as templateComplier, set } from 'lodash';
import * as fs from 'fs-extra';
import * as path from 'path';
import cheerio from 'cheerio';

const getHtmlContent = ({
  template,
  entry,
  templateParameters
}) => {
  let html = fs.readFileSync(template, 'utf-8');

  if (templateParameters) {
    const compiled = templateComplier(html);
    try {
      html = compiled(templateParameters);
    } catch (e) {
      console.log('');
    }
  }

  const $ = cheerio.load(html);
  $('body').append(`<script type="module" src="${entry}" />`);
  $('head').append('<script>global = globalThis</script>');

  return $.html({});
};

interface Option {
  filename: string
  template: string
  entry: string
  rootDir: string
  templateParameters?: object
}

export const htmlPlugin = ({ filename, template, entry, rootDir, templateParameters = {} }: Option): Plugin => {
  let config: ResolvedConfig;
  const pageName = filename.replace('.html', '');
  const tempPath = `.ice/html/${pageName}.html`;
  const htmlPath = path.resolve(rootDir, tempPath);

  const html = getHtmlContent({
    entry: entry.includes(rootDir) ? `/${path.relative(rootDir, entry)}` : entry,
    template,
    templateParameters,
  });

  fs.mkdirpSync(path.dirname(htmlPath));
  fs.writeFileSync(htmlPath, html);

  return {
    name: `vite-plugin-html-${pageName}`,
    enforce: 'pre',
    configResolved(_config) {
      config = _config;
    },
    config(cfg) {
      cfg.build = set(cfg.build, `rollupOptions.input.${pageName}`, htmlPath);
    },
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.endsWith('.html') && req.url !== '/') {
            return next();
          }

          if (req.url === `/${filename}`) {
            res.end(await server.transformIndexHtml(req.url, html));
          } else {
            next();
          }
        });
      };
    },
    async closeBundle() {
      // SPA
      const outDir = config.build.outDir;
      const distPath = path.resolve(rootDir, outDir);
      const outPath = path.resolve(distPath, `${pageName}.html`);
      const sourcePath = path.resolve(distPath, tempPath);

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, outPath);
        fs.removeSync(sourcePath);
      }
    },
  };
};
