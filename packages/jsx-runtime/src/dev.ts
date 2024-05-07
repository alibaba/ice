// @ts-ignore
import { jsxDEV as _jsxDEV, Fragment } from 'react/jsx-dev-runtime';
import { hijackElementProps } from './style.js';

/**
 * @param {*} type
 * @param {object} props
 * @param {string} key
 * @param {boolean} isStaticChildren
 * @param {object} source
 * @param {any} self
 */
function jsxDEV(
  type: any,
  props: object,
  key: string,
  isStaticChildren: boolean,
  source: object,
  self: any,
) {
  return _jsxDEV(type, hijackElementProps(props), key, isStaticChildren, source, self);
}

export { jsxDEV, Fragment };
