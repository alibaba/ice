const qs = require('qs');
const fs = require('fs');
const path = require('path');

const isWin = process.platform === 'win32';

/**
 * Transform Windows-style paths, such as 'C:\Windows\system32' to 'C:/Windows/system32'.
 * Because 'C:\Windows\system32' will be escaped to 'C:Windowssystem32'
 * @param {*} p
 */
const formatPath = (p) => {
  return isWin ? p.split(path.sep).join('/') : p;
};

module.exports = function() {
  const query = typeof this.query === 'string' ? qs.parse(this.query.substr(1)) : this.query;
  const {
    absoluteDocumentPath,
    absoluteAppPath,
    absoluteAppConfigPath,
    absolutePagePath = formatPath(this.resourcePath),
    styles = [],
    scripts = [],
    assetsProcessor,
  } = query;

  const renderHtmlFnc = `
    async function renderComponentToHTML(Component, ctx) {
      const pageData = await getInitialProps(Component, ctx);
      const initialData = appConfig.app && appConfig.app.getInitialData ? await appConfig.app.getInitialData() : {};

      const data = {
        isSSR: true,
        initialData,
        pageData,
      };

      const contentElement = createElement(Component, pageData);

      const initialHtml = renderer.renderToString(contentElement, {
        defaultUnit: 'rpx'
      });

      // use let statement, because styles and scripts may be changed by assetsProcessor
      let styles = ${JSON.stringify(styles)};
      let scripts = ${JSON.stringify(scripts)};

      // process public path for different runtime env
      ${assetsProcessor || ''}

      // This loader is executed after babel, so need to be tansformed to ES5.
      const DocumentContextProvider = function() {};
      DocumentContextProvider.prototype.getChildContext = function() {
        return {
          __initialHtml: initialHtml,
          __initialData: JSON.stringify(data),
          __styles: styles,
          __scripts: scripts,
        };
      };
      DocumentContextProvider.prototype.render = function() {
        return createElement(Document, initialData);
      };

      const DocumentContextProviderElement = createElement(DocumentContextProvider);

      const html = '<!doctype html>' + renderer.renderToString(DocumentContextProviderElement);

      return html;
    }
  `;

  const source = `
    import { createElement } from 'rax';
    import renderer from 'rax-server-renderer';

    import '${formatPath(absoluteAppPath)}';
    import { getAppConfig } from '${formatPath(absoluteAppConfigPath)}'
    import Page from '${formatPath(absolutePagePath)}';
    import Document from '${formatPath(absoluteDocumentPath)}';

    const appConfig = getAppConfig() || {};

    ${renderHtmlFnc}

    async function render(req, res) {
      const html = await renderToHTML(req, res);

      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.send(html);
    }

    async function renderToHTML(req, res) {
      const html = await renderComponentToHTML(Page, {
        req,
        res
      });
      return html;
    }

    // Handler for Midway FaaS and Koa
    async function renderWithContext(ctx) {
      const html = await renderComponentToHTML(Page, ctx);

      ctx.set('Content-Type', 'text/html; charset=utf-8');
      ctx.body = html;
    }

    export {
      render,
      renderToHTML,
      renderWithContext
    };

    export default render;

    async function getInitialProps(Component, ctx) {
      if (!Component.getInitialProps) return null;

      const props = await Component.getInitialProps(ctx);

      if (!props || typeof props !== 'object') {
        const message = '"getInitialProps()" should resolve to an object. But found "' + props + '" instead.';
        throw new Error(message);
      }

      return props;
    }
  `;

  return source;
};
