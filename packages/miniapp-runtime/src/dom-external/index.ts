
import { Element } from '../dom/element.js';
import { Node } from '../dom/node.js';
import { setInnerHTML } from '../dom-external/inner-html/html.js';
import { getBoundingClientRectImpl, getTemplateContent } from './element.js';
import { cloneNode, contains } from './node.js';

Node.extend('innerHTML', {
  set(html: string) {
    setInnerHTML.call(this, this, html);
  },
  get(): string {
    return '';
  },
});
Node.extend('cloneNode', cloneNode);
Node.extend('contains', contains);
Element.extend('getBoundingClientRect', getBoundingClientRectImpl);
Element.extend('content', {
  get() {
    return getTemplateContent(this);
  },
});
