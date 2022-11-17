import type { Element } from '../dom/element.js';

import { DOCUMENT_FRAGMENT } from '../constants/index.js';
import { options } from '../options.js';

export function getBoundingClientRectImpl(this: Element): Promise<null> {
  if (!options.miniGlobal) return Promise.resolve(null);
  return new Promise(resolve => {
    const query = options.miniGlobal.createSelectorQuery();
    query.select(`#${this.uid}`).boundingClientRect(res => {
      resolve(res);
    }).exec();
  });
}

export function getTemplateContent(ctx: Element): Element | undefined {
  if (ctx.nodeName === 'template') {
    const document = ctx.ownerDocument;
    const content: Element = document.createElement(DOCUMENT_FRAGMENT);
    content.childNodes = ctx.childNodes;
    ctx.childNodes = [content];
    content.parentNode = ctx;
    content.childNodes.forEach(nodes => {
      nodes.parentNode = content;
    });
    return content;
  }
}
