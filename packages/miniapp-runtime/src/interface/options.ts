import type { Element as IceElement } from '../dom/element.js';
import type { Text as IceText } from '../dom/text.js';
import type { Element, Text } from '../dom-external/inner-html/parser.js';

export interface Options {
  prerender: boolean;
  debug: boolean;
  html?: {
    skipElements: Set<string>;
    voidElements: Set<string>;
    closingElements: Set<string>;
    transformText?: (iceText: IceText, text: Text) => IceText;
    transformElement?: (iceElement: IceElement, element: Element) => IceElement;
    renderHTMLTag: boolean;
  };
  miniGlobal?: any;
}
