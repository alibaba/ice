import * as http from 'http';
import * as url from 'url';
import * as path from 'path';
import * as fse from 'fs-extra';
import type {
  Page as PuppeteerPage,
  Browser as PuppeteerBrowser,
  WaitForOptions,
  HTTPResponse,
} from 'puppeteer';
import puppeteer from 'puppeteer';

export interface Page extends PuppeteerPage {
  html: () => Promise<string>;
  $text: (selector: string, trim?: boolean) => Promise<string | null>;
  $$text: (selector: string, trim?: boolean) => Promise<(string | null)[]>;
  $attr: (selector: string, attr: string) => Promise<string | null>;
  $$attr: (selector: string, attr: string) => Promise<(string | null)[]>;
  push: (url: string, options?: WaitForOptions & {
    referer?: string;
    referrerPolicy?: string;
  }) => Promise<HTTPResponse | null>;
}

interface BrowserOptions {
  cwd?: string;
  port?: number;
  server?: http.Server;
}

export default class Browser {
  private server: http.Server;
  private browser: PuppeteerBrowser;
  private baseUrl: string;

  constructor(options: BrowserOptions) {
    const { server } = options;
    if (server) {
      this.server = server;
    } else {
      const { cwd, port } = options;
      this.server = this.createServer(cwd!, port!);
    }
  }

  createServer(cwd: string, port: number) {
    return http.createServer((req, res) => {
      const reqUrl: string = req.url || '';
      const pathname = `${cwd}${url.parse(reqUrl).pathname}`.split(path.sep).join('/');
      if (fse.existsSync(pathname)) {
        switch (path.extname(pathname)) { // set HTTP HEAD
          case '.html':
            res.writeHead(200, { 'Content-Type': 'text/html' });
            break;
          case '.js':
            res.writeHead(200, { 'Content-Type': 'text/javascript' });
            break;
          case '.css':
            res.writeHead(200, { 'Content-Type': 'text/css' });
            break;
          case '.gif':
            res.writeHead(200, { 'Content-Type': 'image/gif' });
            break;
          case '.jpg':
            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            break;
          case '.png':
            res.writeHead(200, { 'Content-Type': 'image/png' });
            break;
          default:
            res.writeHead(200, {
              'Content-Type': 'application/octet-stream',
            });
        }
        fse.readFile(pathname, (_err, data) => {
          res.end(data);
        });
      } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
        console.log(`${pathname} Not Found.`);
      }
    }).listen(port, '127.0.0.1');
  }

  async start() {
    this.browser = await puppeteer.launch();
  }

  async close() {
    if (!this.browser) { return; }
    await this.browser.close();
    // @ts-ignore
    if (this.server.stop) {
      // @ts-ignore
      this.server.stop();
    } else {
      this.server.close();
    }
  }

  async page(baseUrl: string, path = '/', disableJS?: boolean): Promise<Page> {
    this.baseUrl = baseUrl;

    if (!this.browser) { throw new Error('Please call start() before page(url)'); }
    const page = (await this.browser.newPage()) as Page;

    if (disableJS) {
      await page.setJavaScriptEnabled(false);
    }

    await page.goto(`${this.baseUrl}${path}`);

    page.push = (url, options) => page.goto(`${this.baseUrl}${url}`, options);
    page.html = () =>
      page.evaluate(() => window.document.documentElement.outerHTML);
    page.$text = (selector, trim) => page.$eval(selector, (el, trim) => {
      return trim ? (el.textContent || '').replace(/^\s+|\s+$/g, '') : el.textContent;
    }, trim);
    page.$$text = (selector, trim) =>
      page.$$eval(selector, (els, trim) => els.map((el) => {
        return trim ? (el.textContent || '').replace(/^\s+|\s+$/g, '') : el.textContent;
      }), trim);
    page.$attr = (selector, attr) =>
      page.$eval(selector, (el, attr) => el.getAttribute(attr as string), attr);
    page.$$attr = (selector, attr) =>
      page.$$eval(
        selector,
        (els, attr) => els.map(el => el.getAttribute(attr as string)),
        attr,
      );

    return page;
  }
}
