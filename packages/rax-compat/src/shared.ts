import react, { ReactElement } from 'react';
import { unmountComponentAtNode } from 'react-dom';
type ChildrenElement<T> = ChildrenElement<T>[] | T;

const INSTANCE_KEY = '_r';
const REACT_ELEMENT_TYPE = Symbol.for('react.element');
function ReactElement(type: any, key: any, ref: any, self: any, source: any, owner: any, props: any) {
    const element = {
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
    return element;
}

// Mocked `Rax.shared`.
const shared = {
  get Element() {
    return function (type: any, key: any, ref: any, props: any, owner: any) {
        return ReactElement(type, key, ref, /* self */ undefined, /* source */ undefined, owner, props);
    };
  },
  Host: {
    get owner() {
        return (react as any).__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner.current;
    },
  },
  Instance: {
    get(node: any) {
        let instance = node[INSTANCE_KEY] || {};
        return {
            ...instance,
            _internal: {
                ...instance._internal,
                unmountComponent: () => {
                    if (node.parentNode?.removeChild) {
                        node.parentNode.removeChild(node);
                    }
                    return unmountComponentAtNode(node);
                },
            },
        };
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
