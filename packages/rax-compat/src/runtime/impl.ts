import * as React from 'react';
import Fragment from '../fragment.js';
import { compatInstanceCreation } from '../create-element.js';

const ReactSharedInternals = React['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'];
const { ReactCurrentOwner } = ReactSharedInternals;
const REACT_ELEMENT_TYPE = Symbol.for('react.element');
const { hasOwnProperty } = Object.prototype;
const __DEV__ = process.env.NODE_ENV !== 'production';

export function jsxs(type: any, props: object, key: string, source: object, self: any) {
  return jsx(type, props, key, source, self);
}

export function jsx(type: any, props: object, key: string, source: object, self: any) {
  const hasValidKey = !hasOwnProperty.call(props, 'key') && key !== undefined;
  const propsWithKey = Object.assign({}, props, hasValidKey ? { key } : null);
  const {
    type: compatType,
    props: compatProps,
  } = compatInstanceCreation(type, propsWithKey);
  const ref = hasValidRef(compatProps) ? compatProps.ref : null;
  return ReactElement(compatType, key, ref, self, source, ReactCurrentOwner.current, compatProps);
}

function ReactElement(type, key, ref, self, source, owner, props) {
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

  if (__DEV__) {
    // @ts-ignore
    const store = element._store = {};
    Object.defineProperty(store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false,
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self,
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source,
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
}

function hasValidRef(props: any) {
  if (hasOwnProperty.call(props, 'ref')) {
    const getter = Object.getOwnPropertyDescriptor(props, 'ref').get;

    if (getter && getter['isReactWarning']) {
      return false;
    }
  }
  return props.ref !== undefined;
}

export { Fragment };
