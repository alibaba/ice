import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';

import type { ReactElement } from 'react';
type ChildrenElement<T> = ChildrenElement<T>[] | T;

// ref: https://github.com/alibaba/rax/blob/master/packages/rax/src/vdom/instance.js#L11
const INSTANCE_KEY = '_r';
const REACT_ELEMENT_TYPE = Symbol.for('react.element');

// Mocked `Rax.shared`.
const shared = {
  Element(type: any, key: any, ref: any, props: any, owner: any) {
    // ref: https://github.com/facebook/react/blob/main/packages/react/src/ReactElement.js#L149-L161
    return {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: REACT_ELEMENT_TYPE,

      // Built-in properties that belong on the element
      type: type,
      key: key,
      ref: ref,
      props: props,

      // Record the component responsible for creating this element.
      _owner: owner,
    };
  },
  Host: {
    get owner() {
      return (React as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
    },
  },
  Instance: {
    get(node: any) {
      return Object.assign({}, node[INSTANCE_KEY], {
        _internal: {
          unmountComponent: () => {
            node.parentNode?.removeChild(node);
            return unmountComponentAtNode(node);
          },
        },
      });
    },
    remove(node: any) {
      node[INSTANCE_KEY] = null;
    },
    set(node: any, instance: any) {
      if (!node[INSTANCE_KEY]) {
        node[INSTANCE_KEY] = instance;
      }
    },
  },
  flattenChildren,
};

function flattenChildren(children: ChildrenElement<ReactElement>) {
  if (children == null) {
    return children;
  }

  const result: ReactElement[] = [];
  // If length equal 1, return the only one.
  traverseChildren(children, result);

  return result.length - 1 ? result : result[0];
}

function traverseChildren(children: ChildrenElement<ReactElement>, result: ReactElement[]) {
  if (Array.isArray(children)) {
    for (let i = 0, l = children.length; i < l; i++) {
      traverseChildren(children[i], result);
    }
  } else {
    result.push(children);
  }
}

export default shared;
