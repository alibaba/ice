// @ts-ignore
import { convertUnit } from 'style-unit';

const STYLE = 'style';

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
        convertedStyle[prop] = typeof style[prop] === 'string' ? convertUnit(style[prop]) : style[prop];
      }
      result['style'] = convertedStyle;
      return result;
    }
  }
  return props;
}
