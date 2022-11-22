import type {
  Attributes,
  FunctionComponent,
  ReactElement,
  ReactNode,
  RefObject,
  SyntheticEvent,
} from 'react';
import { createElement as _createElement, useEffect, useCallback, useRef, forwardRef, useState } from 'react';
import { cached, convertUnit } from 'style-unit';
import VisibilityChange from '@ice/appear';
import { isFunction, isObject, isNumber } from './type';
import transformProps from './props';


// https://github.com/alibaba/rax/blob/master/packages/driver-dom/src/index.js
// opacity -> opa
// fontWeight -> ntw
// lineHeight|lineClamp -> ne[ch]
// flex|flexGrow|flexPositive|flexShrink|flexNegative|boxFlex|boxFlexGroup|zIndex -> ex(?:s|g|n|p|$)
// order -> ^ord
// zoom -> zoo
// gridArea|gridRow|gridRowEnd|gridRowSpan|gridRowStart|gridColumn|gridColumnEnd|gridColumnSpan|gridColumnStart -> grid
// columnCount -> mnc
// tabSize -> bs
// orphans -> orp
// windows -> ows
// animationIterationCount -> onit
// borderImageOutset|borderImageSlice|borderImageWidth -> erim
const NON_DIMENSIONAL_REG = /opa|ntw|ne[ch]|ex(?:s|g|n|p|$)|^ord|zoo|grid|orp|ows|mnc|^columns$|bs|erim|onit/i;

function InputCompat(props: any, inputRef: any) {
  const { value, onInput, onChange, inputType, ...rest } = props;
  const [v, setV] = useState(value);
  const changeCallback = useCallback((event: SyntheticEvent) => {
    setV((event.target as HTMLInputElement).value);

    // Event of onInput should be native event.
    onInput && onInput(event.nativeEvent);
  }, [onInput]);
  const defaultRef = useRef();
  const ref = inputRef || defaultRef;

  useEffect(() => {
    setV(value);
  }, [value]);

  // The onChange event is SyntheticEvent in React, but it is dom event in Rax, so it needs compat onChange.
  useEffect(() => {
    let eventTarget: EventTarget;
    if (ref && ref.current && onChange) {
      eventTarget = ref.current;
      eventTarget.addEventListener('change', onChange);
    }

    return () => {
      if (eventTarget) {
        eventTarget.removeEventListener('change', onChange);
      }
    };
  }, [onChange, ref]);

  return _createElement(inputType, {
    ...rest,
    value: v,
    onChange: changeCallback,
    ref,
  });
}

/**
 * Compat createElement for rax export.
 * Reference: https://github.com/alibaba/rax/blob/master/packages/rax/src/createElement.js#L13
 * @param type
 * @param props
 * @param children
 * @returns Element
 */
export function createElement<P extends {
  ref: RefObject<any>;
  children: any;
  style?: object;
  onAppear?: Function;
  onDisappear?: Function;
}>(
  type: FunctionComponent<P> | string,
  props?: Attributes & P | null,
  ...children: ReactNode[]): ReactElement {
  // Get a shallow copy of props, to avoid mutating the original object.
  let rest: Attributes & P = Object.assign({}, props);
  const { onAppear, onDisappear } = rest;

  // Delete props that are not allowed in react.
  delete rest.onAppear;
  delete rest.onDisappear;

  rest = transformProps(rest);

  // Compat for style unit.
  const compatStyleProps = compatStyle(rest.style);
  if (compatStyleProps) {
    rest.style = compatStyleProps;
  }

  // Setting the value of props makes the component be a controlled component in React.
  // But setting the value is same as web in Rax.
  // User can modify value of props to modify native input value
  // and native input can also modify the value of self in Rax.
  // So we should compat input to InputCompat, the same as textarea.
  if (type === 'input' || type === 'textarea') {
    rest.inputType = type;
    type = forwardRef(InputCompat);
  }

  // Compat for visibility events.
  if (isFunction(onAppear) || isFunction(onDisappear)) {
    return _createElement(
      VisibilityChange,
      {
        onAppear,
        onDisappear,
        children: _createElement(type, rest, ...children),
      },
    );
  } else {
    return _createElement(type, rest, ...children);
  }
}

const isDimensionalProp = cached((prop: string) => !NON_DIMENSIONAL_REG.test(prop));

// Convert unit as driver-dom does.
// https://github.com/alibaba/rax/blob/master/packages/driver-dom/src/index.js#L346
function compatStyle<S = object>(style?: S): S | void {
  if (isObject(style)) {
    // Do not modify the original style object, copy results to another plain object.
    const result = Object.create(Object.prototype);
    for (let key in style) {
      const value = style[key];
      if (isNumber(value) && isDimensionalProp(key)) {
        // Transform rpx to vw.
        result[key] = convertUnit(`${value}rpx`);
      } else {
        result[key] = convertUnit(value);
      }
    }
    return result;
  }
  return style;
}
