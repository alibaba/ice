import type { ViteDevServer, Plugin } from 'vite';
import { template as templateComplier, set } from 'lodash';
import * as fs from 'fs-extra';
import * as path from 'path';
import cheerio from 'cheerio';
import { formatPath } from '@builder/app-helpers';

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

  return $.html({});
};

interface Option {
  filename: string
  template: string
  entry: string
  rootDir: string
  templateParameters?: object
  ssr?: boolean;
  command?: string;
}

export const htmlPlugin = ({ filename, template, entry, rootDir, templateParameters = {}, ssr, command }: Option): Plugin => {
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
  // vite will get relative path by `path.posix.relative(config.root, id)`
  // path.posix.relative will get error path when pass relative path of index html
  const absoluteHtmlPath = formatPath(path.join(rootDir, filename));
  
  const plugin: Plugin = {
    name: `vite-plugin-html-${pageName}`,
    enforce: 'pre',
    config(cfg) {
      cfg.build = set(cfg.build, `rollupOptions.input.${pageName}`, absoluteHtmlPath);
    },
    resolveId(id) {
      if (id.includes('.html')) {
        // win32 场景下在不进行 formatPath，返回的 id 类似 D:\workspace\project\index.html
        // 代码 https://github.com/vitejs/vite/blob/3ceffcca66311f9a7d71612a596b84888c3f843b/packages/vite/src/node/plugins/html.ts#L472 处理后得到 ../../D:\workspace\project\index.html 导致报错，其中 config.root 为 D:/workspace/project
        return formatPath(id);
      }
      return null;
    },
    load(id) {
      if (formatPath(id) === absoluteHtmlPath) {
        return html;
      }
      return null;
    },
    configureServer(server: ViteDevServer) {
      if (!ssr) {
        return () => {
          server.middlewares.use(async (req, res, next) => {
            if (!req.url?.endsWith('.html') && req.url !== '/') {
              return next();
            }
  
            if (req.url === `/${filename}`) {
              try {
                res.setHeader('Content-Type','text/html');
                res.end(await server.transformIndexHtml(req.url, html));
              } catch (e) {
                return next(e);
              }
            }
  
            next();
          });
        };  
      }
    }
  };
  // ssr 在 dev 阶段由中间件进行 html 返回
  if (ssr && command === 'start') {
    plugin.transformIndexHtml = () => {
      return html;
    };
  }

  return plugin;
};
