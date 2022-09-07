import { jsx as _jsx, jsxs as _jsxs, Fragment } from 'react/jsx-runtime';
import { convertUnit } from 'style-unit';

const STYLE = 'style';

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} maybeKey
 * @param {object} source
 * @param {any} self
 */
export function jsx(type: any, props: object, maybeKey: string, source: object, self: any) {
  return _jsx(type, hijackElementProps(props), maybeKey, source, self);
}

// Same as jsx method, special case jsxs internally to take advantage of static children.
// // for now we can ship identical prod functions.
export function jsxs(type: any, props: object, maybeKey: string, source: object, self: any) {
  return _jsxs(type, hijackElementProps(props), maybeKey, source, self);
}

function isObject(obj: any): obj is object {
  return typeof obj === 'object';
}

// Support rpx unit.
export function hijackElementProps(props: { style?: object } | object): object {
  if (props && STYLE in props) {
    const { style } = props;
    if (isObject(style)) {
      const result = Object.assign({}, props);
      const convertedStyle = {};
      for (const prop in style) {
        // @ts-ignore
        convertedStyle[prop] = convertUnit(style[prop]);
      }
      result['style'] = convertedStyle;
      return result;
    }
  }
  return props;
}

export {
  Fragment,
};
