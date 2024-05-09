// @ts-ignore
import { jsx as _jsx, jsxs as _jsxs, Fragment } from 'react/jsx-runtime';
import { hijackElementProps } from './style.js';

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} maybeKey
 * @param {object} source
 * @param {any} self
 */
function jsx(type: any, props: object, maybeKey: string, source: object, self: any) {
  return _jsx(type, hijackElementProps(props), maybeKey, source, self);
}

// Same as jsx method, special case jsxs internally to take advantage of static children.
// // for now we can ship identical prod functions.
function jsxs(type: any, props: object, maybeKey: string, source: object, self: any) {
  return _jsxs(type, hijackElementProps(props), maybeKey, source, self);
}

export {
  Fragment,
  jsx,
  jsxs,
};
