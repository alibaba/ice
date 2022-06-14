import { jsx as _jsx, jsxs as _jsxs, Fragment } from 'react/jsx-runtime';
import { convertUnit } from 'style-unit';

const STYLE = 'style';

/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */
export function jsx(type: any, props: object, maybeKey: string) {
  return _jsx(type, hijackElementProps(props), maybeKey);
}

// Same as jsx method, special case jsxs internally to take advantage of static children.
// // for now we can ship identical prod functions.
export function jsxs(type: any, props: object, maybeKey: string) {
  return _jsxs(type, hijackElementProps(props), maybeKey);
}

function isObject(obj: any): obj is object {
  return typeof obj === 'object';
}

// Support rpx unit.
function hijackElementProps(props: { style?: object } | object): object {
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
