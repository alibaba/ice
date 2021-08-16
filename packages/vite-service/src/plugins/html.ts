import type { ViteDevServer, Plugin } from 'vite';
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
  const pageName = filename.replace('.html', '');

  const getEntry = () => {
    let entryPath: string = entry;
    if (entry.includes(rootDir)) {
      entryPath = path.relative(rootDir, entry);
    }

    return `/${entryPath}`;
  };

  const html = getHtmlContent({
    entry: getEntry(),
    template,
    templateParameters,
  });

  return {
    name: `vite-plugin-html-${pageName}`,
    enforce: 'pre',
    config(cfg) {
      cfg.build = set(cfg.build, `rollupOptions.input.${pageName}`, filename);
    },
    resolveId(id) {
      if (id.includes('.html')) {
        return id;
      }
      return null;
    },
    load(id) {
      if (id === filename) {
        return html;
      }
      return null;
    },
    configureServer(server: ViteDevServer) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          if (!req.url?.endsWith('.html') && req.url !== '/') {
            return next();
          }

          if (req.url === `/${filename}`) {
            try {
              res.end(await server.transformIndexHtml(req.url, html));
            } catch (e) {
              return next(e);
            }
          }

          next();
        });
      };
    }
  };
};
