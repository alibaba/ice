import type { Element } from './element.js';
import { NodeType } from './node_types.js';

type Filter = (element: Element) => boolean;

function returnTrue() {
  return true;
}

export function treeToArray(root: Element, predict?: Filter): Element[] {
  const array: Element[] = [];
  const filter = predict ?? returnTrue;

  let object: Element | null = root;

  while (object) {
    if (object.nodeType === NodeType.ELEMENT_NODE && filter(object)) {
      array.push(object);
    }

    object = following(object, root);
  }

  return array;
}

function following(el: Element, root: Element): Element | null {
  const { firstChild } = el;

  if (firstChild) {
    return firstChild as Element;
  }

  let current: Element | null = el;

  do {
    if (current === root) {
      return null;
    }

    const { nextSibling } = current;

    if (nextSibling) {
      return nextSibling as Element;
    }
    current = current.parentElement;
  } while (current);

  return null;
}
