import type { Element } from '../dom/element.js';
import type { Style } from '../dom/style.js';

export function getComputedStyle(element: Element): Style {
  return element.style;
}
