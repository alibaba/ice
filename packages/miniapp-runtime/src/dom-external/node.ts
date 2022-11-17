import type { Node } from '../dom/node.js';

import { DATASET, OBJECT, PROPS, STYLE } from '../constants/index.js';
import { NodeType } from '../dom/node_types.js';

export type IPosition = 'beforebegin' | 'afterbegin' | 'beforeend' | 'afterend';

export function cloneNode(this: Node, isDeep = false) {
  const document = this.ownerDocument;
  let newNode;

  if (this.nodeType === NodeType.ELEMENT_NODE) {
    newNode = document.createElement(this.nodeName);
  } else if (this.nodeType === NodeType.TEXT_NODE) {
    newNode = document.createTextNode('');
  }

  for (const key in this) {
    const value: any = this[key];
    /* eslint-disable-next-line valid-typeof */
    if ([PROPS, DATASET].includes(key) && typeof value === OBJECT) {
      newNode[key] = { ...value };
    } else if (key === '_value') {
      newNode[key] = value;
    } else if (key === STYLE) {
      newNode.style._value = { ...value._value };
      newNode.style._usedStyleProp = new Set(Array.from(value._usedStyleProp));
    }
  }

  if (isDeep) {
    newNode.childNodes = this.childNodes.map(node => (node as any).cloneNode(true));
  }

  return newNode;
}

export function contains(this: Node, node: Node & { id?: string }): boolean {
  let isContains = false;
  this.childNodes.some(childNode => {
    const { uid } = childNode;
    if (uid === node.uid || uid === node.id || (childNode as any).contains(node)) {
      isContains = true;
      return true;
    }
    return;
  });
  return isContains;
}
