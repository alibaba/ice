import * as cheerio from 'cheerio';

export interface IHTMLOptions {
  headAppendNodes?: string[];
  headPrependNodes?: string[];
  bodyPrependNodes?: string[];
  bodyAppendNodes?: string[];
  faasEnv?: string;
  bodyAttrs?: {
    [key: string]: string;
  };
  htmlAttrs?: {
    [key: string]: string;
  };
  // eslint-disable-next-line camelcase
  g_config?: {
    [key: string]: any;
  };
  title?: string;
  favicon?: string;
  rootId?: string;
}

export default function formatHTML(html: string, options: IHTMLOptions): string {
  const {
    bodyAttrs,
    htmlAttrs,
    // eslint-disable-next-line camelcase
    g_config,
    faasEnv,
    title,
    favicon,
    rootId,
    headAppendNodes,
    headPrependNodes,
    bodyAppendNodes,
    bodyPrependNodes,
  } = options;
  const $ = cheerio.load(html, { decodeEntities: false });
  // eslint-disable-next-line camelcase
  const gConfig = { ...g_config, faasEnv: faasEnv || 'production' };

  if (gConfig) {
    $('head').append(`<script>window.g_config=${JSON.stringify(gConfig)}</script>`);
  }

  // title/favicon 支持覆盖 public/index.html
  if (title) {
    $('title').html(title);
  }
  if (favicon) {
    let iconNode = $('link[rel="icon"]');
    if (iconNode.length === 0) {
      $('head').append('<link rel="icon">');
      iconNode = $('link[rel="icon"]');
    }
    iconNode.attr('href', favicon);
  }

  if (bodyAttrs || htmlAttrs || headAppendNodes || headPrependNodes || bodyAppendNodes || bodyPrependNodes) {
    console.warn('Warning: now you can set html options in public/index.html, no longer need in src/apis/render.ts');
    // eslint-disable-next-line max-len
    console.warn(
      'Warning: html options include: bodyAttrs, htmlAttrs, headAppendNodes, headPrependNodes, bodyAppendNodes, bodyPrependNodes',
    );
  }

  /* 兼容逻辑 start */
  if (rootId) {
    $('#ice-container').attr('id', rootId);
  }
  if (headAppendNodes) {
    $('head').append(headAppendNodes.join('\n'));
  }
  if (headPrependNodes) {
    $('head').prepend(headPrependNodes.join('\n'));
  }
  if (bodyAppendNodes) {
    $('body').append(bodyAppendNodes.join('\n'));
  }
  if (bodyPrependNodes) {
    $('body').prepend(bodyPrependNodes.join('\n'));
  }
  if (bodyAttrs) {
    Object.keys(bodyAttrs).forEach((key) => {
      $('body').attr(key, bodyAttrs[key]);
    });
  }
  if (htmlAttrs) {
    Object.keys(htmlAttrs).forEach((key) => {
      $('html').attr(key, htmlAttrs[key]);
    });
  }
  /* 兼容逻辑 end */

  const result = $.html();
  return result;
}
